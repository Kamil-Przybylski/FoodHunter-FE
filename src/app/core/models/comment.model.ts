import { Expose, Type } from 'class-transformer';
import { IsBoolean, IsNotEmptyObject, IsNumber, IsString, ValidateNested } from 'class-validator';
import { DtoWrapper } from './custom-http.models';
import { UserShort, UserShortDtoModel } from './user.models';

export interface Comments {
  id: number;
  comment: string;
  createDate: string;
  foodId: number;

  userShort: UserShort;
}
export class CommentDtoModel implements Comments, DtoWrapper<Comments> {
  @Expose() @IsNumber() id: number;
  @Expose() @IsString() comment: string;
  @Expose() @IsString() createDate: string;
  @Expose() @IsNumber() foodId: number;

  @Expose()
  @Type(() => UserShortDtoModel)
  @IsNotEmptyObject()
  @ValidateNested()
  userShort: UserShort;

  static getReqFoodDto(foodId: number, comment: string) {
    return { foodId, comment };
  }
}

export interface ShortComment {
  totalItems: number;
  isMyComment: boolean;
}
export class ShortCommentDtoModel implements ShortComment, DtoWrapper<ShortComment> {
  @Expose() @IsNumber() totalItems: number;
  @Expose() @IsBoolean() isMyComment: boolean;
}
