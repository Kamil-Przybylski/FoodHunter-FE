import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone,
  Output,
  EventEmitter,
  Input,
  OnDestroy,
} from '@angular/core';
import { MapsAPILoader, MouseEvent, AgmMap, AgmInfoWindow } from '@agm/core';
import * as _ from 'lodash';
import { FormControl } from '@angular/forms';
import { takeUntil, tap } from 'rxjs/operators';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { RestaurantFormModel, RestaurantFormFields } from '@core/models/restaurant.models';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-food-map',
  templateUrl: './food-map.component.html',
  styleUrls: ['./food-map.component.scss'],
})
export class FoodMapComponent implements OnInit, OnDestroy {
  
  @Input() latitude: number;
  @Input() longitude: number;

  @Output() selectPlace = new EventEmitter<RestaurantFormModel>();

  @ViewChild('search') public searchElementRef: ElementRef;
  @ViewChild(AgmMap) public map: AgmMap;
  @ViewChild(AgmInfoWindow) public infoWindow: AgmInfoWindow;

  zoom: number = 17;
  openMarker = false;

  selectControl = new FormControl('');
  options: google.maps.places.PlaceResult[];
  selectedPlace: google.maps.places.PlaceResult;
  isChoice = false;
  isPlaceLoading = true;

  private placesService: google.maps.places.PlacesService;

  destroyed$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
  ) {}

  ngOnInit() {
    this.prepareMap();
    this.selectModel();
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
  }

  private prepareMap() {
    this.mapsAPILoader.load().then(() => {

      this.placesService = new google.maps.places.PlacesService(
        document.createElement('div')
      );

      const autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement,
        {
          componentRestrictions: { country: 'pl' },
          types: ['establishment'],
        }
      );

      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) return;

          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();

          this.getPlaceById(place.place_id);
          this.setMarker(lat, lng);
        });
      });

      this.getNearbyPlaces(this.latitude, this.longitude);
    });
  }

  private setMarker(lat: number, lng: number) {
    this.ngZone.run(() => {
      this.openMarker = true;
      this.isChoice = false;
  
      this.latitude = lat;
      this.longitude = lng;
      this.infoWindow.open();
    });
  }

  private getNearbyPlaces(latitude: number, longitude: number) {
    this.placesService.nearbySearch(
      {
        location: { lat: latitude, lng: longitude },
        type: 'food',
        types: ['food'],
        radius: 1000,
      },
      (results, status) => {
        if (status === 'OK' && results[0]) {
          this.options = _.filter(
            results,
            (resoult) => _.includes(resoult.types, 'food') && !!resoult.place_id
          );
        }
      }
    );
  }

  private getPlaceById(placeId: string) {
    this.ngZone.run(() => {
      this.isPlaceLoading = true;
  
      this.placesService.getDetails({ placeId: placeId }, (result, status) => {
        if (status === 'OK') {
          this.selectedPlace = result;
          this.isPlaceLoading = false; 
        }
      });
    });
  }

  selectModel() {
    this.selectControl.valueChanges
      .pipe(
        takeUntil(this.destroyed$),
        tap((val: google.maps.places.PlaceResult) => {
          if (!val.place_id) return;
          const lat = val.geometry.location.lat();
          const lng = val.geometry.location.lng();

          this.getPlaceById(val.place_id);
          this.setMarker(lat, lng);
        })
      )
      .subscribe();
  }

  findPlace(event: MouseEvent) {
    if (!event.placeId) return;
    this.getPlaceById(event.placeId);
    this.setMarker(event.coords.lat, event.coords.lng);
  }

  isInfoWindowOpen() {
    return true;
  }

  submitPlace() {
    const place = this.selectedPlace;
    this.isChoice = true;
    if (!place.place_id) return;

    this.selectPlace.emit({
      [RestaurantFormFields.ID]: place.place_id,
      [RestaurantFormFields.NAME]: place.name,
      [RestaurantFormFields.FORMATTED_ADDRESS]: place.formatted_address,
      [RestaurantFormFields.RATING]: place.rating,
      [RestaurantFormFields.URL]: place.url,
      [RestaurantFormFields.WEBSITE]: place.website,
      [RestaurantFormFields.TYPES]: place.types,
    });
  }
}
