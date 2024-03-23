	
	//===================================================================
	//구글맵 관련
	//---------------------------------------------------------------------

	var map=new Array();			//마커 Object 생성
	var markers=new Array();		//마커 핸들링을 위한 배열
	var markersCircle=new Array();	//마커 circle 핸들링을 위한 배열

	//구글맵 마커
	var iconBase = '../images/markers/';
	var icons = {orange:{icon: iconBase + 'orange_m.png'},
				 green:	{icon: iconBase + 'green_m.png'	},
				 purple:{icon: iconBase + 'purple_m.png'},
				 blue:	{icon: iconBase + 'blue_m.png'	},
	};

	//마커와 마커써클 Delete
	function delMarkers(mapVariable){
		for(var key in markers[mapVariable]){
			markers[mapVariable][key].setMap(null);			//마커삭제(Key값이 없을 경우를 대비 각자 지우기)
		}
		markers[mapVariable]=[];

		for(var key in markersCircle[mapVariable]){
			markersCircle[mapVariable][key].setMap(null);	//마커써클 삭제(Key값이 없을 경우를 대비 각자 지우기)
		}
		markersCircle[mapVariable]=[];
	}

	//마커생성
	//mapName : 맵의 메인 변수명
	//houseData : 맵의 자표Data
	function addMarkers(mapName,houseData){

		markers[mapName]=new Array();

		for(var i=0; i<=houseData.length-1; i++){
			if(houseData[i].farmStatus==="IN"){
				var marker=new google.maps.Marker({
					position: new google.maps.LatLng(houseData[i].gpsLat, houseData[i].gpsLng),title:houseData[i].farmName,icon: icons["purple"].icon,map:map[mapName],
					animation:google.maps.Animation.DROP,zIndex:9999
				});
			}
			else{
				var marker=new google.maps.Marker({
					position: new google.maps.LatLng(houseData[i].gpsLat, houseData[i].gpsLng),title:houseData[i].farmName,icon: icons["orange"].icon,map:map[mapName],
				});
			}
			markers[mapName].push(marker);
			

			//Marker click event
			google.maps.event.addListener(marker, 'click', (function(marker, i) {
				return function() {
					var farmCode=houseData[i].farmCode;	
					var farmStatus=houseData[i].farmStatus;	
					//goDetailPage(farmCode,farmStatus);	 	//해당페이지로 이동
					farmSummaryModalShow(farmCode)				//Modal 출력
				}
			})(marker, i));
		}
	}


	//마커생성--영역표시(Km)
	function addMarkersZone(mapName,houseData){
		markers[mapName]=new Array();
		markersCircle[mapName]=new Array();

		for(var i=0; i<=houseData.length-1; i++){
			//마커생성
			if(houseData[i].marker_icon==="orange" || houseData[i].marker_icon==="purple"){
				var marker=new google.maps.Marker({
					position: new google.maps.LatLng(houseData[i].gpsLat, houseData[i].gpsLng),title:houseData[i].farmName, icon: icons[houseData[i].marker_icon].icon,map:map[mapName],
					animation:google.maps.Animation.DROP,zIndex:9999
				});
			}
			else{
				var marker=new google.maps.Marker({
					position: new google.maps.LatLng(houseData[i].gpsLat, houseData[i].gpsLng),title:houseData[i].farmName, icon: icons[houseData[i].marker_icon].icon,map:map[mapName],
				});
			}
			markers[mapName].push(marker);

			//마커 영역 생성
			if(houseData[i].marker_icon==="orange"){
				var mapCircle = new google.maps.Circle({
					strokeColor: 'orange',strokeOpacity: 0.3,strokeWeight: 1,fillColor: 'orange',fillOpacity: 0.3,map: map[mapName],
					center: new google.maps.LatLng(houseData[i].gpsLat, houseData[i].gpsLng),
					radius:5000 /*5Km 반경*/
				});
				markersCircle[mapName].push(mapCircle);
			}
			if(houseData[i].marker_icon==="purple"){
				var mapCircle = new google.maps.Circle({
					strokeColor: 'purple',strokeOpacity: 0.3,strokeWeight: 1,fillColor: 'purple',fillOpacity: 0.3,map: map[mapName],
					center: new google.maps.LatLng(houseData[i].gpsLat, houseData[i].gpsLng),
					radius:30000 /*30Km 반경*/
				});
				markersCircle[mapName].push(mapCircle);
			}

			//Marker click event
			google.maps.event.addListener(marker, 'click', (function(marker, i) {
				return function() {
					var farmCode=houseData[i].farmCode;	
					getHouse(farmCode);	 	//하우스 현황 가져오기
		
				}
			})(marker, i));

		}
	}



	/*===================================================================
	기능설명 : Bar + Line + Area Chart 그리기
	---------------------------------------------------------------------
	파라미터 : chartID => 그려야할 대상 ID  / chartShape=> 차트모양결정 / chkChartType => Chart or SparkLine / chartData => 값들
	---------------------------------------------------------------------
	var barChartData={
		dTitle:'',
		dSubTitle:'',
		dLabels:['Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct'],
		dSeries:[	
					{name: 'Net Profit',data: [44, 55, 57, 56, 61, 58, 63, 60, 66] },
					{name: 'Revenue',data: [76, 85, 101, 98, 87, 105, 91, 114, 94] },
					{name: 'Free Cash Flow',data: [35, 41, 36, 26, 45, 48, 52, 53, 41] }
				]
	};
	====================================================================*/
	function drawBarLineChart(chartID, chartShape, chkChartType, chartData){

		//차트모양결정 - default 값 정의
		var vShape="VerticalBar";	//차트모양
		var vCurve="smooth";		//Sharp:straight / 부드러운:smooth / 스텝라인 : stepline
		var vHorizontal=false;		//fasle : 세로모양 / true : 가로모양
		var vStacked=false;			//false : 누적해제 / true : 누적차트
		var vStackType="100%";		//누적범위:100% / ''
		var vFontSize=12;			//차트 글자크기
		var vColor="";				//차트색상
		var vToolbar=false;			//차트 Toolbar On/Off
		
		vShape=		chartShape;												//차트모양
		vColor=		$("#"+chartID).attr("data-chartColor");					//차트색상
		vFontSize=	$("#"+chartID).attr("data-chartFontSize");				//차트 글자크기
		vToolbar=   JSON.parse($("#"+chartID).attr("data-chartToolBar"));	//차트 툴바 true(보여주기) / false(없애기)  JSON.parse=> String to Boolean 형식변경

		//색상선택
		switch(vColor){
			default:		 vColor={ palette: 'palette2'};		   break;
			case "Primary":	 vColor={ monochrome:{enabled:true,color:'#038edc',shadeTo:'light',shadeIntensity: 0.65} }; break;
			case "Success":	 vColor={ monochrome:{enabled:true,color:'#51d28c',shadeTo:'light',shadeIntensity: 0.65} }; break;
			case "Purple":	 vColor={ monochrome:{enabled:true,color:'#564ab1',shadeTo:'light',shadeIntensity: 0.65} }; break;
			case "Warning":  vColor={ monochrome:{enabled:true,color:'#f7cc53',shadeTo:'light',shadeIntensity: 0.65} }; break;
			case "Danger":	 vColor={ monochrome:{enabled:true,color:'#f34e4e',shadeTo:'light',shadeIntensity: 0.65} }; break;
			case "Info":	 vColor={ monochrome:{enabled:true,color:'#5fd0f3',shadeTo:'light',shadeIntensity: 0.65} }; break;
			case "Secondary":vColor={ monochrome:{enabled:true,color:'#74788d',shadeTo:'light',shadeIntensity: 0.65} }; break;
			case "Dark":	 vColor={ monochrome:{enabled:true,color:'#343a40',shadeTo:'light',shadeIntensity: 0.65} }; break;
			case "Light":	 vColor={ monochrome:{enabled:true,color:'#f5f6f8',shadeTo:'light',shadeIntensity: 0.65} }; break;
		}

		switch(vShape){
			case "VerticalBar":		vShape="bar";  vCurve="smooth";   vHorizontal=false; vStacked=false;  vStackType="";		break;
			case "HorizontalBar":	vShape="bar";  vCurve="smooth";   vHorizontal=true;  vStacked=false;  vStackType="";		break;
			case "StackedVBar":		vShape="bar";  vCurve="smooth";   vHorizontal=false; vStacked=true;   vStackType="";		break;
			case "StackedHBar":		vShape="bar";  vCurve="smooth";   vHorizontal=true;  vStacked=true;   vStackType="";		break;
			case "100StackedVBar":	vShape="bar";  vCurve="smooth";   vHorizontal=false; vStacked=true;   vStackType="100%";	break;
			case "100StackedHBar":	vShape="bar";  vCurve="smooth";   vHorizontal=true;  vStacked=true;   vStackType="100%";	break;
			case "SharpLine":		vShape="line"; vCurve="straight"; vHorizontal=false; vStacked=false;  vStackType="";		break;
			case "SmoothLine":		vShape="line"; vCurve="smooth";   vHorizontal=false; vStacked=false;  vStackType="";		break;
			case "SharpArea":		vShape="area"; vCurve="straight"; vHorizontal=false; vStacked=false;  vStackType="";		break;
			case "SmoothArea":		vShape="area"; vCurve="smooth";   vHorizontal=false; vStacked=false;  vStackType="";		break;
			case "StepLine":		vShape="line"; vCurve="stepline"; vHorizontal=false; vStacked=false;  vStackType="";		break;
			case "StepArea": 		vShape="area"; vCurve="stepline"; vHorizontal=false; vStacked=false;  vStackType="";		break;
		}


		//Data Mapping => yaxis : y축 단위,  categories : x축 범례 , series : 본 Data
		var chartOptions = {
			title:{text: chartData.dTitle,align: "left"},														/*차트제목*/
			series: chartData.dSeries ,
			chart: {type: vShape ,height:"100%",stacked:vStacked, stackType:vStackType,zoom:{enabled:false}, toolbar:{show:vToolbar}  }, /*stacked: true => 누적차트/ stacked: false => 누적해제 / stackType::"100%" => 100%누적 / toolbar : 다운메뉴 On/Off */
			plotOptions: { bar: {horizontal: vHorizontal,columnWidth:"55%", endingShape:"rounded"} },			/*horizontal: false => VerticalBar / horizontal: true => HorizontalBar  / columnWidth : 두께조절 */
			dataLabels: { enabled:false, style:{fontSize:"10px"} },												/*enabled:true => 그래프 안에 Data값 출력*/
			stroke: {show:true, width:2, colors:["transparent"]},												/*barChart전용*/
			stroke: {curve : vCurve,dashArray: [0, 2, 4] },														/*LineChar전용 - Sharp한 Line : straight / SmoothLine : smooth / StepLine : stepline*/
			xaxis: { categories: chartData.dLabels, labels:{style:{fontSize : vFontSize}} },
			yaxis: { title: { text: "" }, labels:{style:{fontSize : vFontSize}}  },								/*y축 서브 타이틀 , y축 Label font조정*/
			fill: { opacity:0.8 },
			tooltip: { y: { formatter: function (val) { return "" + val + "" } } },
			theme: vColor   //Theme 사용가능=> Gradation Effect 
		};


		// SparkLine option 지정
		var sparkLineOptions = {
			series: chartData.dSeries,
			chart: {type: vShape, height:"100%", sparkline: {enabled: true} },
			fill: { opacity: 0.5 },
			xaxis: { categories: chartData.dLabels, labels:{style:{fontSize : vFontSize}} },
			yaxis: {min: 0 },
			title: {text: chartData.dTitle, offsetX: 0,style: {fontSize: "24px"}  },
			subtitle: { text: chartData.dSubTitle ,offsetX: 0, style: { fontSize: "14px"} },
			plotOptions: { bar: {horizontal: vHorizontal,columnWidth:"55%", endingShape:"rounded"} },	/*horizontal: false => VerticalBar / horizontal: true => HorizontalBar  / columnWidth : 두께조절 */
			stroke: {curve: vCurve },																	/*LineChar전용 - Sharp한 Line : straight / SmoothLine : smooth / StepLine : stepline*/
			theme: vColor   //Theme 사용가능=> Gradation Effect 
		};

		//차트초기화
		$("#"+chartID).html("");

		// 차트 그리기
		switch(chkChartType){
			case "Chart":  var chart = new ApexCharts( document.querySelector("#"+chartID), chartOptions); break;
			case "SparkLine": var chart = new ApexCharts( document.querySelector("#"+chartID), sparkLineOptions); break;
		}
		chart.render();
	}


	/*===================================================================
	기능설명 : Pie + Donut 그리기
	---------------------------------------------------------------------
	파라미터 : chartID => 그려야할 대상 ID  / chartShape=> 차트모양결정 / chkChartType => Chart or SparkLine / chartData => 값들
	---------------------------------------------------------------------
	var pieChartData={
		dTitle:'',
		dSubTitle:'',
		dLabels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E']
		dSeries: [44, 55, 13, 43, 22], 
	};
	====================================================================*/
	function drawPieChart(chartID, chartShape, chkChartType, chartData){
		
		//차트모양결정 - default 값 정의
		var vShape="Pie";			//차트모양
		var vSmooth="gradient";		//부드러운 모양
		var vSemiDonut={},vGrid={};	//세미도넛 모양
		var vColor="";				//차트색상
		var vFontSize=12;			//차트 글자크기
		var vToolbar=false;			//차트 Toolbar On/Off

		vShape=		chartShape;												//차트모양
		vColor=		$("#"+chartID).attr("data-chartColor");					//차트색상
		vFontSize=	$("#"+chartID).attr("data-chartFontSize");				//차트 글자크기
		vToolbar=   JSON.parse($("#"+chartID).attr("data-chartToolBar"));	//차트 툴바 true(보여주기) / false(없애기)  JSON.parse=> String to Boolean 형식변경


		//색상선택
		switch(vColor){
			default:		 vColor={ palette: "palette2"};		   break;
			case "Primary":	 vColor={ monochrome:{enabled:true,color:"#038edc",shadeTo:"light",shadeIntensity: 0.65} }; break;
			case "Success":	 vColor={ monochrome:{enabled:true,color:"#51d28c",shadeTo:"light",shadeIntensity: 0.65} }; break;
			case "Purple":	 vColor={ monochrome:{enabled:true,color:"#564ab1",shadeTo:"light",shadeIntensity: 0.65} }; break;
			case "Warning":  vColor={ monochrome:{enabled:true,color:"#f7cc53",shadeTo:"light",shadeIntensity: 0.65} }; break;
			case "Danger":	 vColor={ monochrome:{enabled:true,color:"#f34e4e",shadeTo:"light",shadeIntensity: 0.65} }; break;
			case "Info":	 vColor={ monochrome:{enabled:true,color:"#5fd0f3",shadeTo:"light",shadeIntensity: 0.65} }; break;
			case "Secondary":vColor={ monochrome:{enabled:true,color:"#74788d",shadeTo:"light",shadeIntensity: 0.65} }; break;
			case "Dark":	 vColor={ monochrome:{enabled:true,color:"#343a40",shadeTo:"light",shadeIntensity: 0.65} }; break;
			case "Light":	 vColor={ monochrome:{enabled:true,color:"#f5f6f8",shadeTo:"light",shadeIntensity: 0.65} }; break;
		}

		switch(vShape){
			case "Pie":				vShape="pie";   vSmooth="";			break;
			case "SmoothPie":		vShape="pie";   vSmooth="gradient";	break;
			case "Donut":			vShape="donut"; vSmooth="";			break;
			case "SemiDonut":		vShape="donut"; vSmooth="";			vSemiDonut={radialBar:{startAngle:-90,endAngle:90,track:{background:"#e7e7e7",strokeWidth:"97%",margin:5,dropShadow:{enabled:!0,top:2,left:0,color:"#999",opacity:1,blur:2}},dataLabels:{name:{show:!1},value:{offsetY:-2,fontSize:"22px"}}}}; break;
			case "SmoothDonut":		vShape="donut"; vSmooth="gradient";	break;
			case "SmoothSemiDonut": vShape="donut"; vSmooth="gradient";	vSemiDonut={radialBar:{startAngle:-90,endAngle:90,track:{background:"#e7e7e7",strokeWidth:"97%",margin:5,dropShadow:{enabled:!0,top:2,left:0,color:"#999",opacity:1,blur:2}},dataLabels:{name:{show:!1},value:{offsetY:-2,fontSize:"22px"}}}}; break;
		}


		//Data Mapping => yaxis : y축 단위,  categories : x축 범례 , series : 본 Data
		var chartOptions = {
			title:{text: chartData.dTitle,align: "left"},	/*차트제목*/
			series: chartData.dSeries, 
			labels: chartData.dLabels,

			chart: {width:"100%", type: vShape, toolbar:{show:vToolbar}, },
			responsive: [{ breakpoint: 480, options: { chart: {width: 200}, legend: {position: "bottom"}    } }],
			plotOptions : vSemiDonut, grid : vGrid,			/*세미도넛을 만들기 위함*/
			fill: {type : vSmooth},							/*'' : 원본 / 'gradient' : 부드럽게*/
			dataLabels: { style:{fontSize : vFontSize} },
			theme: vColor   //Theme 사용가능=> Gradation Effect
		};


		var sparkLineOptions={
			series:chartData.dSeries,
			labels: chartData.dLabels,
			chart:{type:"radialBar",height:200,offsetY:-20,sparkline:{enabled:!0} },
			stroke: {width: 1},
			plotOptions:vSemiDonut,

		};


		//차트초기화
		$("#"+chartID).html("");

		// 차트 그리기 명령
		switch(chkChartType){
			case "Chart":  var chart = new ApexCharts( document.querySelector("#"+chartID), chartOptions); break;
			case "SparkLine":  var chart = new ApexCharts( document.querySelector("#"+chartID), sparkLineOptions); break;
		}

		chart.render();
	}

	
	/*===================================================================
	기능설명 : mixed 그리기
	---------------------------------------------------------------------
	파라미터 : chartID => 그려야할 대상 ID  / chartShape=> 차트모양결정 / chkChartType => Chart or SparkLine / chartData => 값들
	---------------------------------------------------------------------
	var mixedChartData={
		dTitle:'',
		dSubTitle:'',
		dLabels: ['01 Jan 2001', '02 Jan 2001', '03 Jan 2001', '04 Jan 2001', '05 Jan 2001', '06 Jan 2001', '07 Jan 2001', '08 Jan 2001', '09 Jan 2001', '10 Jan 2001', '11 Jan 2001', '12 Jan 2001'],
		dSeries: [
			{name: 'A자료',data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160]},
			{name: 'C자료',data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16]}
		]
	};
	====================================================================*/
	function drawMixedChart(chartID, chartShape, chkChartType, chartData){

		//차트모양결정 - default 값 정의
		var vShape="bar|line";	//차트모양
		var vFontSize=12;		//차트 글자크기
		var vToolbar=false;		//차트 Toolbar On/Off

		vShape=		chartShape;												//차트모양
		vColor=		$("#"+chartID).attr("data-chartColor");					//차트색상
		vFontSize=	$("#"+chartID).attr("data-chartFontSize");				//차트 글자크기
		vToolbar=   JSON.parse($("#"+chartID).attr("data-chartToolBar"));	//차트 툴바 true(보여주기) / false(없애기)  JSON.parse=> String to Boolean 형식변경


		//dSeries Data에 type:'bar' 요소를 추가함
		var vShapeArr=vShape.split("|");

		//----요소추가
		$.each (chartData.dSeries, function (index, el) {
			el.type=vShapeArr[0];						//vShapeArr[0] 요소추가
			if(chartData.dSeries.length-1 == index){
				el.type=vShapeArr[1];					//제일 마지막은 vShapeArr[1] 요소추가
			}
		});


		//색상선택
		switch(vColor){
			default:		 vColor={ palette: "palette2"};		   break;
			case "Primary":	 vColor={ monochrome:{enabled:true,color:"#038edc",shadeTo:"light",shadeIntensity: 0.65} }; break;
			case "Success":	 vColor={ monochrome:{enabled:true,color:"#51d28c",shadeTo:"light",shadeIntensity: 0.65} }; break;
			case "Purple":	 vColor={ monochrome:{enabled:true,color:"#564ab1",shadeTo:"light",shadeIntensity: 0.65} }; break;
			case "Warning":  vColor={ monochrome:{enabled:true,color:"#f7cc53",shadeTo:"light",shadeIntensity: 0.65} }; break;
			case "Danger":	 vColor={ monochrome:{enabled:true,color:"#f34e4e",shadeTo:"light",shadeIntensity: 0.65} }; break;
			case "Info":	 vColor={ monochrome:{enabled:true,color:"#5fd0f3",shadeTo:"light",shadeIntensity: 0.65} }; break;
			case "Secondary":vColor={ monochrome:{enabled:true,color:"#74788d",shadeTo:"light",shadeIntensity: 0.65} }; break;
			case "Dark":	 vColor={ monochrome:{enabled:true,color:"#343a40",shadeTo:"light",shadeIntensity: 0.65} }; break;
			case "Light":	 vColor={ monochrome:{enabled:true,color:"#f5f6f8",shadeTo:"light",shadeIntensity: 0.65} }; break;
		}

		var chartOptions = {
			title:{text: chartData.dTitle,align: "left"},								/*차트제목*/
			series: chartData.dSeries,
			chart: {height:"100%",type: vShapeArr[1], toolbar:{show:vToolbar} },		/*차트높이*/
			stroke: {curve :"smooth" ,width: [0, 4]},									/*LineChar전용 - Sharp한 Line : straight / SmoothLine : smooth / StepLine : stepline*/
			dataLabels: {enabled: true,enabledOnSeries: [2]},							/*Line차트의 peak값 boxing처리*/
			labels: chartData.dLabels,
			xaxis: { labels:{style:{fontSize :vFontSize}} },
			yaxis: [ {title: {text: ""}, labels:{style:{fontSize :vFontSize}}, tooltip: {enabled: true}  }, {opposite: true,title: {text: ""}}  ], /*y축 왼쪽,오른쪽 title*/
	        tooltip: {fixed: {enabled: true,position: "topLeft",offsetY: 30,offsetX: 60} }, // topRight, topLeft, bottomRight, bottomLeft
			theme: vColor   //Theme 사용가능=> Gradation Effect
        };


		//차트초기화
		$("#"+chartID).html("");
		
		var chart = new ApexCharts(document.querySelector("#" + chartID), chartOptions);
		chart.render();

	}



	/*=====================================================================
	//Table안의 SparkLine으로 HTML로 간단하게 만들기 (bar,line,area,pie,donut만 됨)
	//=====================================================================
	쌍따옴표는 사용하지 말것 ==> 쌍따옴표 처리
	<div style='width:50px;margin:auto' class='tableSparkLine' data-label='aa,bb' data-series='50,50' data-type='pie' data-height='20' data-width='40' data-color='Purple'></div>
	<div style='width:100px;margin:auto' class='tableSparkLine' data-label='aa,bb,cc,dd,ee' data-series='50,50,30,20,10' data-type='bar' data-height='20' data-width='50' data-color=''>
	*/
	function tableSparkLine(){
		$(".tableSparkLine").each(function(idx){

			var dLabel=JSON.parse(JSON.stringify($(this).attr("data-label").split(",")));
			var dSeries=JSON.parse(JSON.stringify($(this).attr("data-series").split(",").map(Number)));
			var vShape=$(this).attr("data-shape");
			var vWidth=$(this).attr("data-width");
			var vHeight=$(this).attr("data-height");
			var vColor=$(this).attr("data-color");
			var vValue=$(this).attr("data-value") ? $(this).attr("data-value") : "";
			

			//색상선택
			switch(vColor){
				default:		 vColor={ palette: "palette2"};		   break;
				case "Primary":	 vColor={ monochrome:{enabled:true,color:"#038edc",shadeTo:"light",shadeIntensity: 0.65} }; break;
				case "Success":	 vColor={ monochrome:{enabled:true,color:"#51d28c",shadeTo:"light",shadeIntensity: 0.65} }; break;
				case "Purple":	 vColor={ monochrome:{enabled:true,color:"#564ab1",shadeTo:"light",shadeIntensity: 0.65} }; break;
				case "Warning":  vColor={ monochrome:{enabled:true,color:"#f7cc53",shadeTo:"light",shadeIntensity: 0.65} }; break;
				case "Danger":	 vColor={ monochrome:{enabled:true,color:"#f34e4e",shadeTo:"light",shadeIntensity: 0.65} }; break;
				case "Info":	 vColor={ monochrome:{enabled:true,color:"#5fd0f3",shadeTo:"light",shadeIntensity: 0.65} }; break;
				case "Secondary":vColor={ monochrome:{enabled:true,color:"#74788d",shadeTo:"light",shadeIntensity: 0.65} }; break;
				case "Dark":	 vColor={ monochrome:{enabled:true,color:"#343a40",shadeTo:"light",shadeIntensity: 0.65} }; break;
				case "Light":	 vColor={ monochrome:{enabled:true,color:"#f5f6f8",shadeTo:"light",shadeIntensity: 0.65} }; break;
			}

			var barLineOptions = {
				series: [ {"data" : dSeries } ],
				labels: dLabel,
				chart: {type: vShape, height: vHeight, sparkline: {enabled: true} },
				fill: { opacity: 0.5 },
				xaxis: {crosshairs: { width: 1} },
				yaxis: {min: 0 },
				plotOptions: { bar: {horizontal: false,columnWidth:"70%", endingShape:"rounded"} },	/*horizontal: false => VerticalBar / horizontal: true => HorizontalBar  / columnWidth : 두께조절 */
				theme: vColor   //Theme 사용가능=> Gradation Effect 
			};

			 var pieDonutOptions={
				series: dSeries,
				labels: dLabel,
				chart: {type: vShape,width : vWidth, sparkline: {enabled: true} },
				stroke: {width: 1},
				tooltip: { fixed: {enabled: false} },
				theme: vColor	//Theme 사용가능=> Gradation Effect
			};

			/**
			 * 2022-11-22 소현 수정
			 * radialBarChart 옵션 추가
			 */
			var radialOptions={
				series: dSeries,
				labels: dLabel,
				color: vColor,
				chart: {height: vHeight,type:vShape},
				plotOptions: {radialBar: {hollow: {margin:50,size: "50%"},dataLabels: {showOn: "always",name: {offsetX:-10, offsetY:-10,show: true,color: "#a7a7a7",fontSize: "15px"},value: {color: "#111",fontSize: "23px",show: true}}}}, 
				stroke: {lineCap: "round"},
				fill: {type: "gradient", gradient: {shade: "dark", type: "vertical", gradientToColors: ["#87D4F9"], stops: [0, 100]}}
			  }

			
			//초기화
			$(".tableSparkLine").eq(idx).html("");

			if(vShape=="pie" || vShape=="donut"){
				var chart = new ApexCharts( document.getElementsByClassName( $(this).attr("class") )[idx], pieDonutOptions);
			}
			else if(vShape=="radialBar"){
				var chart = new ApexCharts( document.getElementsByClassName( $(this).attr("class") )[idx], radialOptions);
			}else{
				var chart = new ApexCharts( document.getElementsByClassName( $(this).attr("class") )[idx], barLineOptions);
			}
			chart.render();


		});

	}

	/*=====================================================================
	//달력 만들기
	//=====================================================================
	var calDataArr=[
		{ id:"KF0001", title: "● kkkk", start:"2022-08-08T00:00:00", end:"2022-08-10T23:59:59", color:""},
		{ id:"KF0002", title: "● aaaa", start:"2022-08-08T00:00:00", end:"2022-08-10T23:59:59", color:"#776ACF"}
	];

	//캘린더 Item을 클릭했을때 이벤트 처리
	function calendarItemClick(eventData){
		alert(eventData.event.id);
	}
	*/
	function drawCalendar(calID,calDataArr){
		//alert(JSON.stringify(calDataArr));



		var calendarEl = document.getElementById(calID);
		var calendar = new FullCalendar.Calendar(calendarEl, {
			headerToolbar: { left: '', center: 'title', right: ''},
			/*locale:'en',*/
			themeSystem: 'bootstrap',
			allDays:false,					/*false:시간도 반영함*/
			displayEventTime:false,			/*이벤트날짜 출력 하지 않음*/
			editable: true,					/*Drag & Drop 가능*/
			dayMaxEvents: true,				/*+more버튼 (셀 높이에 따라 자동 변경)*/
			height: '100%',					/*자동 높이 조절*/
			businessHours: false,			/* true면 토/일요일의 Background color 변경*/
			events: calDataArr,				/*캘린더 Data Array*/
			eventClick: calendarItemClick,  /*캘린더 itemClick event => 해당 페이지에서 처리*/

			titleFormat : function(date) { /* title 설정*/
				return date.date.year +"년 "+(date.date.month +1)+"월";
			},
			dayHeaderContent: function (date) {
				var weekList = ["일", "월", "화", "수", "목", "금", "토"];
			return weekList[date.dow];
			}

		});
		calendar.render();


		//달력 버튼제어
		$(".calendarBtn-Prev").click(function(){  calendar.prev(); });	//이전 달
		$(".calendarBtn-Next").click(function(){  calendar.next(); });	//다음 달
		$(".calendarBtn-Today").click(function(){ calendar.today(); });//오늘

	}



	/*=====================================================================
	//Bootstrap Table Row 제어 및 SparkLine 출력
	//=====================================================================*/

	//BootStrap Table Event발생시 한번더 simpleSparkLine을 그려줌

	$(document).ready(function(){
		$(".table").on('reset-view.bs.table', function (e, eventName, eventArge) {

			//tableSparkLine(); //Bootstrap Table내의 HTML sparkLine 실행

			//배지 갯수출력
			var badgeCnt=0;
			var trVisible=$("#"+ $(this).attr("id") + " tbody tr:visible");

			if(trVisible.length > 0 && trVisible.html().includes("No matching records found") ){
				badgeCnt=trVisible.length-1;
			}
			else{
				badgeCnt=trVisible.length;
			}
			$("#"+ $(this).attr("id") +"RecNo").html(" + " + badgeCnt.toString());
		});
	});


	//Bootstrap-table Row HideShow 글자값
	function tableSingleHideShowRowData(tableID,searchStr){

		if(searchStr=="All"){
			$("#"+tableID).bootstrapTable("getHiddenRows", true);
		}
		else{
			var dataArr=$("#"+tableID).bootstrapTable("getData");
			$.each(dataArr, function (idx, rowData) {
				if( searchStr==rowData.f2){	
					$("#"+ tableID + " tbody tr:eq(" + idx + ")").show();  //$("#" + tableID + " > tbody > tr")[idx].style.display=""; $("#"+tableID).bootstrapTable('showRow', {index:idx} );
				}
				else{
					$("#"+ tableID + " tbody tr:eq(" + idx + ")").hide();
				}
			});
		}

		//배지 갯수출력
		var badgeCnt=0;
		var trVisible = $("#"+ tableID + " tbody tr:visible");
		if(trVisible.length > 0 && trVisible.html().includes("No matching records found") ){
			badgeCnt=trVisible.length-1;
		}
		else{
			badgeCnt=trVisible.length;
		}
		$("#"+ tableID +"RecNo").html(" + " + badgeCnt.toString());
	}

	//Bootstrap-table Row HideShow 범위값
	function tableRangeHideShowRowData(tableID,startDay,endDay){

		var dataArr=$("#"+tableID).bootstrapTable("getData");
		$.each(dataArr, function (idx, rowData) {
			if( Number(rowData.f3) >startDay && Number(rowData.f3)<=endDay){	
				$("#"+ tableID + " tbody tr:eq(" + idx + ")").show();
			}
			else{
				$("#"+ tableID + " tbody tr:eq(" + idx + ")").hide();
			}
		});

		//배지 갯수출력
		var badgeCnt=$("#"+ tableID + " tbody tr:visible").length;
		$("#"+ tableID +"RecNo").html(" + " + badgeCnt.toString());
	}


	
	//상단 #dashtoggle Scroll 제어===============================================
	$(document).ready(function(){
		var n=document.getElementById("dash-troggle-icon"),a=!0,o=document.getElementById("dashtoggle"),s=new bootstrap.Collapse(o,{toggle:!1});
		n.addEventListener("click",function(){a=!1,setTimeout(function(){a=!0},500)}),window.addEventListener("scroll",function(){(100<document.documentElement.scrollTop||0==document.documentElement.scrollTop)&&a&&(20<window.pageYOffset?s.hide():s.show(),window.innerWidth<=992&&(a=!1,setTimeout(function(){a=!1},500),s.hide()))});
	});


	/*===================================
	jQgrid에서 날짜표현하는 Formatter
	=====================================*/

	//3자리 (,) 찍기
	function comma(n) {
	  var reg = /(^[+-]?\d+)(\d{3})/;   // 정규식
	  n += "";                          // 숫자를 문자열로 변환
	  while (reg.test(n)){
		  n = n.replace(reg, "$1" + "," + "$2");
	  }
	  return n;
	}

	//datetime to date
	function formatter_date(cellvalue,options,roeObject){
		var returnData="";
		if (cellvalue!="" && cellvalue.substr(0,10)!="2000-01-01" ) {
			returnData=cellvalue.substr(0,10);
		}

		return returnData;
	}

	//String to 날짜
	function formatter_strdate(cellvalue,options,roeObject){
		var returnData="";
		if (cellvalue!="") {
			var strDate=cellvalue;
			var yy=strDate.substr(0,4);
			var mm=strDate.substr(4,2);
			var dd=strDate.substr(6,2);
			returnData=yy + "-" + mm + "-" + dd;
		}
		return returnData;
	};

	//조치현황
	function formatter_asStatus(cellvalue,options,roeObject){
		var retHTML="";
		switch(cellvalue){
			case "민원접수": retHTML="<button class='btn btn-sm btn-danger font-size-10'>민원접수</button>"; break;
			case "민원중단": retHTML="<button class='btn btn-sm btn-success font-size-10'>민원중단</button>"; break;
			case "처리완료": retHTML="<button class='btn btn-sm btn-primary font-size-10'>처리완료</button>"; break;
		}

		return retHTML;
	}

	function formatter_currStatus(cellvalue,options,roeObject){
		var retHTML="";
		switch(cellvalue){
			case "IN" : retHTML="<div class='badge bg-primary font-size-12'> 입추 </div>"; break;
			case "OUT" : retHTML="<div class='badge bg-secondary font-size-12'> 출하 </div>"; break;
			case "DEL" : retHTML="<div class='badge bg-danger font-size-12'> 삭제 </div>"; break;
		}
		return retHTML;
	}


	function formatter_inoutDate(cellvalue,options,roeObject){
		var retHTML="";
		if(cellvalue=="2000-01-01 00:00:00" || cellvalue==null){
			retHTML="-";
		}
		else{
			retHTML=cellvalue;
		}
		return retHTML;
	}


	//카메라 구동==============================================================
	var cameraImg = new Image();
	function cameraStart(cameraURL){
		cameraImg.src=cameraURL + "&date=" + (new Date()).getTime();
		cameraImg.onerror=function(){cameraError()};
		cameraImg.onload=function(){cameraUpdate(cameraURL)};
	}
	function cameraUpdate(cameraURL){
		cameraImg.src=cameraURL + "&date=" + (new Date()).getTime();
		$("#cameraModalImg").attr("src",cameraImg.src);
	}
	function cameraError(){
		$("#cameraModalImg").attr("src","../images/noimage.jpg");
		cameraClose();
	}
	function cameraClose(){
		cameraImg.onload="";
		return false;
	}	
	//카메라 구동==============================================================	


	//카메라 PopUp===============================================================
	function cameraPopup(dongName,dongAvgWeight,cameraURL,dongDays,dongStatus){
		cameraStart(cameraURL);
		if(dongStatus=="IN"){
			$("#cameraModalTitle").html(dongName + " : " +  dongAvgWeight + "g (" + dongDays + "일령)" );
		}
		else{
			$("#cameraModalTitle").html(dongName + " : 출하 후 " +  dongDays +"일 경과" );
		}
		$("#cameraModal").modal("show");
	}


	//모달이 자동 종료되면 onload event Close()
	$(document).ready(function(){
		$("#cameraModal").on("hidden.bs.modal", function () {
			cameraClose();
		});
	});




//===================================
//Loading Circle
//===================================
function loadingCircle(chkOnOff){
	var thisObj=$(window);
	var objTop=0;
	var objLeft=0;

	var objWidth=thisObj.width();
	var objHeight=thisObj.height();

	$("#loadingCircle").css({
		'top':objTop,'left':objLeft,'width':objWidth,'height':objHeight,'position':'fixed','z-index':'9999','background':'gray',opacity:0.4
	});

	var imgLeft=(objWidth-252)/2;
	var imgTop=(objHeight-252)/2;
	$("#loadingCircleImage").css({
		'margin-left':imgLeft,'margin-top':imgTop
	});
		
	switch(chkOnOff){
		case "on":
			$("#loadingCircle").fadeIn();
			break;
		case "off":
			$("#loadingCircle").fadeOut();
			break;
	}
}

//===================================
//팝업 메시지창(Alert를 대신)
//===================================
function alertModal(geTtitle,getMsg){
	$("#alertTitle").html(geTtitle);	//modal title
	$("#alertBody").html("<p>" + getMsg + "</p>");		//modal 내용
	$("#alertModal").modal('show');		//modal open
}



//===================================
//LeftSlider Action 처리
//===================================
/* farmCode : 입추코드, farmStatus : 입추/출하 상태*/
function goDetailPage(farmCode, farmStatus){
	var goUrl="";

	if(farmCode=="Modal"){
		farmCode=$("#farmSummary_FarmCode").html();
	}

	switch(farmStatus){
		case "IN"		: goUrl="../02/0201.php?farmCode=" + farmCode; break; //입추(동)
		case "OUT"		: goUrl="../02/0202.php?farmCode=" + farmCode; break; //출하(동)
		case "HISTORY"	: goUrl="../04/0401.php?farmCode=" + farmCode; break; //출하이력(농장)
		case "ACTIONTIME": goUrl="../04/0404.php?farmCode=" + farmCode; break; //Actuator 가동시간
	}
	location.replace(goUrl);
}


//===================================
//현재 서버의 날짜 구하기(Y-m-d H:i:s 형식)
//===================================
function currDateTime(){
	var today = new Date();

	var year = today.getFullYear();
	var month = ('0' + (today.getMonth() + 1)).slice(-2);
	var day = ('0' + today.getDate()).slice(-2);
	var hours = ('0' + today.getHours()).slice(-2); 
	var minutes = ('0' + today.getMinutes()).slice(-2);
	var seconds = ('0' + today.getSeconds()).slice(-2);

	var dateString = year + '-' + month  + '-' + day + " " + hours + ':' + minutes  + ':' + seconds;

	return dateString;
}


//===================================
//Scroll to UP
//===================================
$(document).ready(function(){
	$('body').append("<a href='' id='scroll-to-top'></a>"); $("#scroll-to-top").illBeBack(); 
});


