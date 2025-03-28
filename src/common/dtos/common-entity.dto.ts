import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CommonEntityDto {
  @Expose()
  id: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
