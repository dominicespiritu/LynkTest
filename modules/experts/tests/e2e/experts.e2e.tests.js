'use strict';

describe('Experts E2E Tests:', function () {
  describe('Test Experts page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/experts');
      expect(element.all(by.repeater('expert in experts')).count()).toEqual(0);
    });
  });
});
