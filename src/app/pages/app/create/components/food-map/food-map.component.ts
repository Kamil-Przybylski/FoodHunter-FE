import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone,
  Output,
  EventEmitter,
} from '@angular/core';
import { MapsAPILoader, MouseEvent, AgmMap, AgmInfoWindow } from '@agm/core';
import * as _ from 'lodash';
import { FormControl } from '@angular/forms';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-food-map',
  templateUrl: './food-map.component.html',
  styleUrls: ['./food-map.component.scss'],
})
export class FoodMapComponent implements OnInit {
  @ViewChild('search', { static: false }) public searchElementRef: ElementRef;
  @ViewChild(AgmMap, { static: false }) public map: AgmMap;
  @ViewChild(AgmInfoWindow, { static: false }) public infoWindow: AgmInfoWindow;
  @Output() selectPlace = new EventEmitter<google.maps.places.PlaceResult>();

  latitude: number;
  longitude: number;
  zoom: number;
  openMarker = false;

  selectControl = new FormControl('');
  options: google.maps.places.PlaceResult[];
  selectedPlace: google.maps.places.PlaceResult;
  isPlaceLoading = true;

  private placesService: google.maps.places.PlacesService;

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {}

  ngOnInit() {
    this.prepareMap();
    this.selectModel();
  }

  private prepareMap() {
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();

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
          this.setNewLocation(lat, lng);
        });
      });
    });
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 17;
        this.getNearbyPlaces(this.latitude, this.longitude);
      });
    }
  }

  private setNewLocation(lat: number, lng: number) {
    this.latitude = lat;
    this.longitude = lng;
    this.zoom = 17;
  }

  private setMarker(lat: number, lng: number) {
    this.openMarker = true;
    this.latitude = lat;
    this.longitude = lng;
    this.infoWindow.open();
  }

  private getNearbyPlaces(latitude: number, longitude: number) {
    this.placesService.nearbySearch(
      {
        location: { lat: latitude, lng: longitude },
        type: 'food',
        types: ['food'],
        radius: 500,
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
    this.isPlaceLoading = true;
    this.placesService.getDetails({ placeId: placeId }, (result, status) => {
      if (status === 'OK') {
        this.selectedPlace = result;
        console.log(666, result);
        this.isPlaceLoading = false;
      }
    });
  }

  selectModel() {
    this.selectControl.valueChanges
      .pipe(
        tap((val: google.maps.places.PlaceResult) => {
          if (!val.place_id) return;
          const lat = val.geometry.location.lat();
          const lng = val.geometry.location.lng();
          this.getPlaceById(val.place_id);
          this.setMarker(lat, lng);
          this.setNewLocation(lat, lng);
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
}
