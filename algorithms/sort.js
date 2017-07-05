Array.prototype.addMethod = function () {
	this.quickSort = quickSort;
}

/**
 * 快速排序(递归)
 * @param  {array} array 数组
 * @return {array}       排序后数组
 */
function quickSort1(array = this){
	function sort(start, end){
		let i = start;
		let j = end;

		// 基准数
		let flag = array[start];
		
		// 如果还没有排序完
		if (end > start) {
			while(i < j){
				for(; i < j; j--){
					// 从后往前找到比i索引小的数字
					if (array[j] < flag) {
					array[i++] = array[j];
					break;
					};
				}
				for( ; i < j; i++){
					// 从前往后找到比j索引大的数字
					if (array[i] > flag){
						array[j--] = array[i];
						break;
					}
				}
			}
			array[i] = flag;
			sort(0, i);
			sort(i + 1, end);
		}
	}
	sort(0, array.length - 1);
	return array;
}

/**
 * 快速排序(非递归)
 * @param  {array} array 数组
 * @return {array}       排序后数组
 */
function quickSort2(array = this){
	
		let i = 0;
		let j = array.length - 1;
		let flag = 0;
		let stack = [];
		stack.push(i);
		stack.push(j);

		while(stack.length) {
			// 基准数
			j = stack.pop();
			i = stack.pop();
			
			let start = i;
			let end = j;
			flag = array[start];

			while(i < j){
				for(; i < j; j--){
					// 从后往前找到比i索引小的数字
					if (array[j] < flag) {
					array[i++] = array[j];
					break;
					};
				}
				for( ; i < j; i++){
					// 从前往后找到比j索引大的数字
					if (array[i] > flag){
						array[j--] = array[i];
						break;
					}
				}
			}

			array[i] = flag;

			if(start < i){
				stack.push(start);
				stack.push(i);
			}
			if(end > (i+1)){
				stack.push(i + 1);
				stack.push(end);
			}
		}
	return array;
}