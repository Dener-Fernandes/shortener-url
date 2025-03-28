import { CommonEntityInterface } from 'src/common/interfaces';

export interface UserInterface extends CommonEntityInterface {
  userName: string;
  email: string;
  password: string;
  salt: string;
  active: boolean;
}
