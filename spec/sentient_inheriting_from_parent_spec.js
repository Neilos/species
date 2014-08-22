describe("SentientBeing inherits from parent;", function() {
  var Human, Ape, bob;

  beforeEach(function() {
    Ape = { dexterity : "poor" };
    Ape.prototype = {};
    Ape.prototype.communicate = function() { return "ook" };
    Human = SentientBeing({ parent : Ape });
    bob = new Human();
  });

  describe("an attribute of the parent (i.e. non-prototype attributes)", function() {

    describe("when the parent is a plain old javascript object", function() {

      it("attribute is NOT inherited", function() {
        expect(bob.dexterity).toBe(undefined);
      });

    });

    describe("when parent is another SentientBeing", function() {
      var Vulcan, Romulan, remus

      beforeEach(function() {

        Vulcan = new SentientBeing({
          bringToLife: function() {
            return function() {
              this.ears = "pointy";
              this.emotional = false;
            };
          }
        });

        Romulan = SentientBeing({
          parent : Vulcan,
          bringToLife: function() {
            return function() { this.emotional = true; };
          }
        });

        remus = new Romulan();
      });

      it("attribute is inherited", function() {
        expect(remus.ears).toEqual("pointy");
      });

      it("attributes on parent do not overwrite attributes on the child", function() {
        expect(remus.emotional).toBe(true);
      });

    });

  });

  describe("an attribute inherited from the parent's prototype", function() {

    it("can be called on object instances", function() {
      expect(bob.communicate()).toEqual("ook");
    });

    it("is not a property of object instances", function() {
      expect("communicate" in bob).toBe(true);
      expect(bob.hasOwnProperty("communicate")).toBe(false);
    });

    it("is not property of the contructor function", function() {
      expect(Human.hasOwnProperty("communicate")).toBe(false);
    });

    it("can be overridden in the constructor function's prototype", function() {
      Human.prototype.communicate = function() { return "How do you do"; };
      expect(bob.communicate()).toEqual("How do you do");
      delete Human.prototype.communicate
      expect(bob.communicate()).toEqual("ook");
    });

  });

  describe("the returned constructor function", function() {

    it("has a parent property that is set to the specified parent's prototype", function() {
      expect(Human.parent).toBe(Ape.prototype);
    });

  });

  describe("an object instance", function() {

    it("has a parent property that is set to the parent", function() {
      expect(bob.parent).toBe(Ape);
    });

    describe("when parent is a constructor function", function() {

      it("is an instanceof <parent>", function() {
        var Monkey = function() {};
        var SpiderMonkey = SentientBeing({ parent : Monkey })
        var fred = new SpiderMonkey();
        console.log(fred.parent);
        expect(fred instanceof fred.parent).toEqual(true);
      });

    });

  });

});


