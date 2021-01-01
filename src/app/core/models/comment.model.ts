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
  @Expose() @IsNumber() id!: number;
  @Expose() @IsString() comment!: string;
  @Expose() @IsString() createDate!: string;
  @Expose() @IsNumber() foodId!: number;

  @Expose()
  @Type(() => UserShortDtoModel)
  @IsNotEmptyObject()
  @ValidateNested()
  userShort!: UserShort;

  static getReqFoodDto(foodId: number, comment: string) {
    return { foodId, comment };
  }
}

export interface CommentInfo {
  totalItems: number;
  isMyComment: boolean;
}
export class CommentInfoDtoModel implements CommentInfo, DtoWrapper<CommentInfo> {
  @Expose() @IsNumber() totalItems!: number;
  @Expose() @IsBoolean() isMyComment!: boolean;
}

export interface LikesInfoDto {
  totalItems: number;
  isMyLike: boolean;
}
export class LikesInfoDtoModel implements LikesInfoDto, DtoWrapper<LikesInfoDto> {
  @Expose() @IsNumber() totalItems!: number;
  @Expose() @IsBoolean() isMyLike!: boolean;
}
