import { ControlsService } from './controls.service';

describe('Services/ControlsService', () => {
  it('getGroups() correctly calls backend to fetch control groups', (done) => {
    const service = new ControlsService();

    // TODO: Just fake expect since we don't request Backend yet.
    service.getGroups().then((groups) => {
      expect(groups.length).toEqual(2);
    }).then(done, done);
  });
});
