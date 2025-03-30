import { CommonEntityInterface } from 'src/common/interfaces';
import { UrlDto } from 'src/modules/url/dtos/url.dto';

export interface UserInterface extends CommonEntityInterface {
  userName: string;
  email: string;
  password: string;
  salt: string;
  active: boolean;
  urls?: UrlDto[];
}
