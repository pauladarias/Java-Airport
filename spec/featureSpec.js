'use strict';

describe("Feature Test", function() {

  var weather;
  var plane;
  var airport;

  beforeEach(function(){
    plane = new Plane();
    airport = new Airport();
  });

  describe('under normal conditions', function(){
    beforeEach(function(){
      spyOn(Math, 'random').and.returnValue(0);
    });
    it("planes can land at aiport", function() {
      plane.land(airport);
      expect(airport.planes()).toContain(plane);
    });
    it('planes can be instructed to takoff', function(){
      plane.land(airport);
      plane.takeoff();
      expect(airport.planes()).not.toContain(plane);
    });
  });


  describe('under stromy conditions', function(){
    it('does not clear planes for takeoff', function(){
      spyOn(airport, 'isStormy').and.returnValue(true);
      expect(function(){ airport.clearForTakeOff(plane); }).toThrowError('cannot takeoff during storm');
    });
    it('block takeoff when weather is stormy', function(){
      plane.land(airport)
      spyOn(airport, 'isStormy').and.returnValue(true);
      expect(function(){ plane.takeoff();}).toThrowError('cannot takeoff during storm');
      expect(airport.planes()).toContain(plane);
    });
  });
});
