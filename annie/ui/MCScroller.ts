/**
 * @module annieUI
 */
namespace annieUI {
    /**
     * 用滚动的方式播放MC
     * @class annieUI.MCScroller
     * @public
     * @extends annie.Scroller
     * @since 3.1.5
     */
    export class MCScroller extends annieUI.Scroller {
        private _mc:annie.MovieClip=null;

        /**
         * 滑动的速率，值越大，滑动越慢,默认是10
         * @property rate
         * @param {number} value
         * @since 3.1.5
         * @public
         */
        public set rate(value:number){
            let s=this;
            if(value!=s._rate){
                let sw:number=0,sh:number=0;
                if(s._isVertical){
                    sh=s._mc.totalFrames*value;
                }else{
                    sw=s._mc.totalFrames*value;
                }
                s.setScrollWH(sw,sh);
            }
        };
        public get rate():number{
            return this._rate;
        }
        private _rate:number=0;

        /**
         * 鼠标滑动的方向，默认纵向
         * @property isVertical
         * @readonly
         * @since 3.1.5
         * @public
         * @return {boolean}
         */
        public get isVertical():boolean{
            return this._isVertical;
        }

        /**
         * 只读，获取当前mc的frame具体值，带小数
         * @property curFramePos
         * @readonly
         * @return {number}
         */
        public get curFramePos():number{
            let s=this;
            let frame:number=1;
            if(s._isVertical){
                frame=s.curX/s._rate;
            }else{
                frame=s.curY/s._rate;
            }
            return Math.abs(frame)+1;
        }
        private _isVertical:boolean=true;
        /**
         * 构造函数
         * @method MCScroller
         * @param {annie.MovieClip} mc 要被滑动的mc
         * @param {number} rate mc 灵敏度，值越大滑动越慢，默认为10
         * @param {boolean} isVertical 是横向还是竖向滑动，默认是竖向
         */
        constructor(mc:annie.MovieClip,rate:number=10,isVertical: boolean = true){
            super(mc,0,0,0,0);
            let s=this;
            s._instanceType = "annieUI.MCScroller";
            s._mc=mc;
            s.isBounce=false;
            s._isVertical=isVertical;
            s.rate=rate;
            s.addEventListener(annie.Event.ON_SCROLL_ING,function (e:annie.Event) {
                let frame:number=1;
                if(isVertical){
                    frame=s.curX/rate;
                }else{
                    frame=s.curY/rate;
                }
                mc.gotoAndStop(Math.abs(frame)+1);
            })
        }
    }
}