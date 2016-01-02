---
layout: default
title: 영향력 관측치
---

# 영향력 관측치

회귀분석에서 특정 관측값의 영향력을 시각적으로 볼 수 있으면 영향력측도의
개념을 더욱 쉽게 이해할 수 있다. 다음 그래프에서 여러 위치의 값들이 회귀계수
기울기의 추정값에 어떻게 영향을 주는지를 실험해 보아라.

- 마우스로 클릭하여 데이터를 추가할 수 있다.
- 스위치를 "remove"로 옮긴 후 마우스로 점을 클릭하여 데이터를 제거할 수 있다.
- 점을 드래그하여 데이터를 변경할 수 있다.
- Clear All 버튼을 누르면 모든 데이터가 삭제된다.
- Example 버튼을 누르면 예제 데이터가 표시된다. 예제는 R 패키지 `regbook`에
  포함된 `infludata`이다. 강근석·김충락(2013)의 예제5-1 참조.

<style>
button {
    border: 1px solid #aaaaaa;
	background:#ffffff;
	-moz-border-radius:42px;
	-webkit-border-radius:42px;
	border-radius:42px;
	display:inline-block;
	cursor:pointer;
	color:#adadad;
	margin: 5px 0px;
}
button:hover {
	background-color: #0088cc;
	color: #ffffff;
	border: 1px solid #0088cc;
}
button:active {

}
</style>

<link rel="stylesheet" href="http://olance.github.io/jQuery-switchButton/jquery.switchButton.css">
<script src="http://olance.github.io/jQuery-switchButton/jquery.switchButton.js"></script>

<div style="width:100%">

<button type="button" onclick="clearAll()">Clear All</button>
<button type="button" onclick="exampleDataset()">Example</button>

<div style="display: inline-block; position: relative; top:10px; float: right;">
	<input type="checkbox" name="add" value="1" checked>
</div>


<script type="text/javascript">
$("input[name=add]").switchButton({
	on_label: 'add',
		off_label: 'remove'
});
</script>

<div id="plot"></div>

<math>
	<mtable columnspacing="0.28em" displaystyle="true">
		<mtr>
				<mi>y</mi>
			<maligngroup/>
				<mo>=</mo>
				<mn id="intercept"></mn>
				<mn id="slope"></mn>
				<mo>&InvisibleTimes;</mo>
				<mi>x</mi>
		</mtr>
		<mtr>
				<msup><mi>R</mi><mn>2</mn></msup>
			<maligngroup/>
			<mo>=</mo></maligngroup>
			<mn id="rsquared"></mn>
		</mtr>
	</mtable>
</math>


<div>

<script src="regression.js" type="text/javascript"></script>



### 참고문헌

- 강근석·김충락 (2013). 「SAS를 활용한 선형회귀분석」. 교우사.

