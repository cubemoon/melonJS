game.MoleStaticEntity = me.Sprite.extend({
    init:function (x, y, color) {
        this._super(me.Sprite, "init", [x, y , { image: me.loader.getImage("mole"), framewidth: 178, frameheight: 140}]);   
        this.addAnimation ("idle",  [0]);
        this.setCurrentAnimation("idle");     
        this.color = color;
    },
    draw:function(renderer){
        var rc = this.getBounds();
        renderer.setColor(this.color);
        renderer.strokeRect(rc.left-rc.width*this.anchorPoint.x, rc.top-rc.height*this.anchorPoint.y, rc.width, rc.height);
        this._super(me.Sprite, "draw", [renderer]);        
    },

});

game.RectBorder = me. Renderable.extend({
    init:function(x,y,w,h){
        this._super(me.Renderable, "init",[x,y,w,h]);
      },
      draw:function(renderer){
            renderer.clearColor(new me.Color(128,128,128,1.0));
            renderer.strokeRect(this.pos.x, this.pos.y, this.width, this.height);
      }
});

game.TestScreen = me.ScreenObject.extend({
    init:function(){
      this.mole1 = null;
      this.mole2 = null;
    },
    onResetEvent: function() {

        me.game.reset();
        me.input.registerPointerEvent("pointerdown", me.game.viewport, this.onMouseDown.bind(this));

        var rc = new game.RectBorder(0, 0, me.game.viewport.getWidth(), me.game.viewport.getHeight());
        me.game.world.addChild (rc, 14);	
        
        this.mole1 = new game.MoleStaticEntity(178/2, 140/2, new me.Color(255,0,0,1.0));
        this.mole1.anchorPoint.set(0.5, 0.5);
        me.game.world.addChild (this.mole1, 15);

        this.mole2 = new game.MoleStaticEntity(500, 500, new me.Color(0,255,0,1.0));
        this.mole2.anchorPoint.set(0.5, 0.5);
        me.game.world.addChild (this.mole2, 15);
    },
    onMouseDown : function(e) {
        if (this.mole1 && this.mole1.containsPoint(e.gameX, e.gameY)){
            this.mole1.scale(0.5,0.5);
            me.game.repaint();
            return false;
        }
        if (this.mole2 && this.mole2.containsPoint(e.gameX, e.gameY)){
            this.mole2.scale(0.5,0.5);
            me.game.repaint();
            return false;
        }
        return true;
    },
    onDestroyEvent: function() {
        me.input.releasePointerEvent("pointerdown", me.game.viewport);
    }
});
