import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
let arrayObj = require('../../assets/data.json');
let CanvasJSChart = CanvasJSReact.CanvasJSChart;

class LineChart extends Component {
	
	render() {
		const options = {
			
			animationEnabled: true,
			exportEnabled: true,
			theme: "light2", 
			title:{
				text: "Percent Value Vs Category"
			},
			axisY: {
				title: "Value",
				includeZero: false,
				suffix: "%"
			},
			axisX: {
				title: "Category",
				prefix: "",
				interval: 1
			},
			data: [{
				type: "line",
				toolTipContent: "User :{user}",
				dataPoints: getDataPoints()
				
			}],
			
		}
		
		return (
		<div>
			<h1> </h1>
			<CanvasJSChart options = {options} 
			/>
			
		</div>
		);

		
		//All data manipulation will be done in this method and final results will set into datapoints.
		function getDataPoints()
			{
				
						
						/* To get datapoint value in x and y co-ordinates format */
						for (var i = 0; i < arrayObj.length; i++) 
							{
									arrayObj[i].x = arrayObj[i].category;
									arrayObj[i].y = arrayObj[i].value;
									delete arrayObj[i].category;
									delete arrayObj[i].value;
							}
			//percentage value criteria which is based on the proportion from the total value for all category.
			arrayObj.map(x => ({...x, y:( (x.y/ 139)*100)}));
			//to sort based on category, here Category is changed by x
			  arrayObj.sort((a, b) => (a.x > b.x) ? 1 : -1);
	   
             //Get Unique categories
			 let results=getUnique(arrayObj,'x');
			 return results;

		}
        /* Remove duplicates categories */
		function getUnique(arr, comp)
		    {
				const unique = arr
					.map(e => e[comp])
			
				// store the keys of the unique objects
				.map((e, i, final) => final.indexOf(e) === i && i)
			
				// eliminate the dead keys & store unique objects
				.filter(e => arr[e]).map(e => arr[e]);
			
				return unique;
		   }
		  
		 

	}
}

export default LineChart;                           