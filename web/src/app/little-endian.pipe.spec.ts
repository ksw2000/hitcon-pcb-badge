import { LittleEndianPipe } from './little-endian.pipe';

describe('LittleEndianPipe', () => {
  it('create an instance', () => {
    const pipe = new LittleEndianPipe();
    expect(pipe).toBeTruthy();
  });
});
