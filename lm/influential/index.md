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
- Shift키를 누른 상태에서 점을 클릭하면 삭제된다.
- Clear All 버튼을 누르면 모든 데이터가 삭제된다.


<link rel="stylesheet" href="http://olance.github.io/jQuery-switchButton/jquery.switchButton.css">
<script src="http://olance.github.io/jQuery-switchButton/jquery.switchButton.js"></script>

<div style="width:600px">
<button type="button" onclick="clearAll()">Clear All</button>
<button type="button" onclick="exampleDataset()">Example</button>

<div class="switch-wrapper" style="display: inline-block; position: relative; top:5px; float: right;">
	<input type="checkbox" name="add" value="1" checked>
</div>

<script type="text/javascript">
$("input[type=checkbox]").switchButton({
on_label: 'add',
off_label: 'remove'
});
</script>

<div id="plot"></div>

<math xmlns="http://www.w3.org/1998/Math/MathML">
	<mi>y</mi>
	<mo>=</mo>
	<span id="intercept"></span>
	<span id="slope"></span>
	<mi>x</mi>
</math>


<i>R<sup>2</sup></i> = <span id="rsquared"></span>



<div>

<script src="regression.js" type="text/javascript"></script>



### 참고문헌

- 강근석·김충락 (2013). 「SAS를 활용한 선형회귀분석」. 교우사.

