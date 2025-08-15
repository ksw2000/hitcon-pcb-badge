import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'littleEndian'
})
export class LittleEndianPipe implements PipeTransform {
  transform(value: number): string {
    const tokens: string[] = [];
    const mask = 0xff;
    while (value > 0) {
      const token = value & mask;
      tokens.push(token.toString(16).padStart(2, "0"));
      value = value >> 8;
    }
    while(tokens.length < 4) {
      tokens.push("00");
    }
    return tokens.join(" ");
  }
}
