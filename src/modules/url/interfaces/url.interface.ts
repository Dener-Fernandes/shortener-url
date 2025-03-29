import { CommonEntityInterface } from 'src/common/interfaces';

export interface UrlInterface extends CommonEntityInterface {
  originalUrl: string;
  shortUrl: string;
  accessCount: number;
  deletedAt: Date | null;
  userId: string | null;
}
