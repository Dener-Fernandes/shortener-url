export class AuthResponseDto {
  readonly accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }
}
