import React from "react";
import classNames from "classnames";
import "./EpilogLayer.styl";
import TextTypingControl from "../controls/TextTypingControl.jsx";

/*
공기가 아주 깨끗했던 공휴일,
자전거를 타고 강변으로 나섰다.

전날에 내린 비에 깨끗하게 씻긴 세상과
짙고 푸른 하늘에 눈을 뗄 수 없는,
날씨 그 자체가 선물처럼 느껴지는 아름다운 날이었다.

자전거를 세워놓고 강물 위에 부서지는 빛을 한참을 바라보며
참 행복하다고 느끼던 순간,
문득 아침에 보고 나온 지진 기사가 생각이 났다.
경주에 지진이 있고 나서 몇 주가 지난 때였다.

이렇게 아름다운 날 큰 지진이 일어나면 어떡하지?

꼭 죽음이 코앞에 닥쳐온 것처럼 불안감이 크게 일었다.

나를 위해 존재하던 것 같은 아름다운 풍경이 사실은
나의 행복에 아무런 관심이 없는
자연일 뿐인 것에 새삼
무력한 기분이 들었다.

-

문득 지금 이 시각 지구 어딘가에서 고통받고 있는 사람들이 떠올랐다.
내전으로 인해 죽음의 경계를 넘나드는 난민들이라던지
자연재해가 휩쓸고 간 마을의 주민들이라던지
그곳의 하늘도 이렇게 아름다울까?

-

유독 더 충격적으로 느껴지는 사고뉴스들이 있다.
나에게 일어날 수도 있었던, 그런 뉴스들이 특히 그렇다.
아침에 공사장을 지나는 시내버스를 크레인이 덮쳤다더라,
음주운전 차량이 할머니를 도와주던 20살 청년을 덮쳤다더라,
다 같이 점심을 먹고 나오며 그날 실검에 올라온 뉴스에 대해 이러쿵저러쿵 얘기를 한다.
오늘 날씨가 참 좋은데. 바람이 부드럽고 뺨에 닿는 온도가 시원하고
그리고 괜히 속상하고 이상한 기분이 든다.

-

이 작업은 그 속상하고 이상한 순간들을 애도하기 위해 만들었다.
우리의 인생에 언제나 무관심한 채로 공존하고 있는 자연은,
그래서 때론 위로가 되고 그래서 때론 더 슬프게 한다는 것을 잊지 않고 싶다.
*/


const createRightIcon = () => {
  return (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9.12 15.41">
    <g><g><polyline style={{
      "fill": "none",
      "stroke": "#fff",
      "strokeMiterlimit": 10,
      "strokeWidth": 2
    }} points="0.71 0.71 7.71 7.71 0.71 14.71" /></g></g>
  </svg>);
}


class EpilogLayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      story: 0,
      storyEndPoint: -1
    }
    this.isStory4End = false;
    this.lastClickTime = new Date();
  }

  nextStory() {
    let story = this.state.story;

    let nowDate = new Date();
    nowDate.setSeconds(nowDate.getSeconds() - 1);
    if (this.lastClickTime >= nowDate) {
      return;
    }
    if (story == 4) {
      if (this.isStory4End == false) {
        return;
      }
    }

    if (this.state.storyEndPoint != this.state.story) {
      this.setState({
        storyEndPoint: this.state.story
      });
      return;
    }

    story = this.state.story + 1;
    
    if (story > 12) {
      location.reload();
      return;
    }
    this.setState({
      story: story
    });

    this.lastClickTime = new Date();
  }

  onAnimationEnd(pagePoint) {
    this.state.storyEndPoint = pagePoint;
  }

  onAnimationEndStory4() {
    this.isStory4End = true;
    this.onAnimationEnd(4);
  }

  render() {
    let story = this.state.story;
    let typingClass = classNames({
      "skip": this.state.storyEndPoint == this.state.story
    });

    return (
      <div className="epilog-layer" onMouseDown={e => this.nextStory()} onTouchStart={e => this.nextStory()}>
        <div className="container">
          <div className="story-line">
            {story == 0 && <div className="text text-fadein">
              <p className={typingClass}>공기가 아주 깨끗했던 공휴일,</p>
              <p className={typingClass}>자전거를 타고 강변으로 나섰다.</p>
              <p className={typingClass} onAnimationEnd={e => this.onAnimationEnd(0)}><span className="next">{createRightIcon()}</span></p>
            </div>}
            {story == 1 && <div className="text text-fadein">
              <p className={typingClass}>전날에 내린 비에 깨끗하게 씻긴 세상과</p>
              <p className={typingClass}>짙고 푸른 하늘에 눈을 뗄 수 없는,</p>
              <p className={typingClass}>날씨 그 자체가 선물처럼 느껴지는 아름다운 날이었다.</p>
              <p className={typingClass} onAnimationEnd={e => this.onAnimationEnd(1)}><span className="next">{createRightIcon()}</span></p>
            </div>}
            {story == 2 && <div className="text text-fadein">
              <p className={typingClass}>자전거를 세워놓고</p>
              <p className={typingClass}>강물 위에 부서지는 빛을 한참을 바라보며</p>
              <p className={typingClass}>참 행복하다고 느끼던 순간,</p>
              <p className={typingClass}>문득 아침에 보고 나온 지진 기사가 생각이 났다.</p>
              <p className={typingClass} onAnimationEnd={e => this.onAnimationEnd(2)}><span className="next">{createRightIcon()}</span></p>
            </div>}
            {story == 3 && <div className="text text-fadein">
              <p className={typingClass}>경주에 지진이 있고 나서 몇 주가 지난 때였다.</p>
              <p className={typingClass} onAnimationEnd={e => this.onAnimationEnd(3)}><span className="next">{createRightIcon()}</span></p>
            </div>}
            {story == 4 && <div className="text">
              <TextTypingControl text={"이렇게 아름다운 날, 큰 지진이 일어나면 어떡하지?"} onAnimationEnd={() => this.onAnimationEndStory4()} speed={100} isLastIcon={true}/>
            </div>}
            {story == 5 && <div className="text text-fadein">
              <p className={typingClass}>꼭 죽음이 코앞에 닥쳐온 것처럼 불안감이 크게 일었다.</p>
              <p className={typingClass} onAnimationEnd={e => this.onAnimationEnd(5)}><span className="next">{createRightIcon()}</span></p>
            </div>}
            {story == 6 && <div className="text text-fadein">
              <p className={typingClass}>나를 위해 존재하던 것 같은 아름다운 풍경이 사실은</p>
              <p className={typingClass}>나의 행복에 아무런 관심이 없는</p>
              <p className={typingClass}>자연일 뿐인 것에 새삼</p>
              <p className={typingClass}>무력한 기분이 들었다.</p>
              <p className={typingClass} onAnimationEnd={e => this.onAnimationEnd(6)}><span className="next">{createRightIcon()}</span></p>
            </div>}
            {story == 7 && <div className="text text-fadein">
              <p className={typingClass}>문득 지금 이 시각 지구 어딘가에서</p>
              <p className={typingClass}>고통받고 있는 사람들이 떠올랐다.</p>
              <p className={typingClass}>내전으로 인해 죽음의 경계를 넘나드는 난민들이라던지</p>
              <p className={typingClass}>자연재해가 휩쓸고 간 마을의 주민들이라던지</p>
              <p className={typingClass}>그곳의 하늘도 이렇게 아름다울까?</p>
              <p className={typingClass} onAnimationEnd={e => this.onAnimationEnd(7)}><span className="next">{createRightIcon()}</span></p>
            </div>}
            {story == 8 && <div className="text text-fadein">
              <p className={typingClass}>유독 더 충격적으로 느껴지는 사고뉴스들이 있다.</p>
              <p className={typingClass}>나에게 일어날 수도 있었던, 그런 뉴스들이 특히 그렇다.</p>
              <p className={typingClass} onAnimationEnd={e => this.onAnimationEnd(8)}><span className="next">{createRightIcon()}</span></p>
            </div>}
            {story == 9 && <div className="text text-fadein">
              <p className={typingClass}>아침에 공사장을 지나는 시내버스를</p>
              <p className={typingClass}>크레인이 덮쳤다더라,</p>
              <p className={typingClass}>할머니를 도와주던 20살 청년을</p>
              <p className={typingClass}>음주운전 차량이 덮쳤다더라,</p>
              <p className={typingClass}>다 같이 점심을 먹고 나오며</p>
              <p className={typingClass}>그날 실검에 올라온 뉴스에 대해</p>
              <p className={typingClass}>이러쿵저러쿵 얘기를 한다.</p>
              <p className={typingClass} onAnimationEnd={e => this.onAnimationEnd(9)}><span className="next">{createRightIcon()}</span></p>
            </div>}
            {story == 10 && <div className="text text-fadein">
              <p className={typingClass}>오늘 날씨가 참 좋은데.</p>
              <p className={typingClass}>바람이 부드럽고 뺨에 닿는 온도가 시원하고</p>
              <p className={typingClass}>그리고 괜히 속상하고 이상한 기분이 든다.</p>
              <p className={typingClass} onAnimationEnd={e => this.onAnimationEnd(10)}><span className="next">{createRightIcon()}</span></p>
            </div>}
            {story == 11 && <div className="text text-fadein">
              <p className={typingClass}>이 작업은</p>
              <p className={typingClass}>그 속상하고 이상한 순간들을</p>
              <p className={typingClass}>애도하기 위해 만들었다.</p>
              <p className={typingClass} onAnimationEnd={e => this.onAnimationEnd(11)}><span className="next">{createRightIcon()}</span></p>
            </div>}
            {story == 12 && <div className="text text-fadein">
              <p className={typingClass}>우리의 인생에 언제나 무관심한 채로 공존하고 있는 자연은,</p>
              <p className={typingClass}>그래서 때론 위로가 되고</p>
              <p className={typingClass}>그래서 때론 더 슬프게 한다는 것을</p>
              <p className={typingClass}></p>
              <p className={typingClass}>잊지 않고 싶다.</p>
              <p className={typingClass} onAnimationEnd={e => this.onAnimationEnd(12)}><span className="next">fin {createRightIcon()}</span></p>
            </div>}
          </div>
        </div>
      </div>
    )
  }
}


export default EpilogLayer;