export class Giph{

  type: string;
  id: string;
  images: {
    fixed_width_downsampled: {
      url: String
    }
  };
  count: number;

  constructor() {
    this.type = '';
    this.id = '';
    this.count = 0;
    this.images = {
      fixed_width_downsampled: {
        url: ''
      }
    };
  }
}