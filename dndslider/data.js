export const tree1 = [
	{
		id: 1, 
		title: 'node1', 
		children: [
			{
				id: 3, 
				title: 'sub node1' ,
			}, 
			{ 
				id: 4, 
				title: 'sub node1' , 
				children: [ { id: 5, title: 'sub sub node1'}]
			}
		] ,
	},
	{
		id: 2, 
		title: 'node2', 
		children: [
			{
				id: 6, 
				title: 'sub node2' ,
			}, 
			{ 
				id: 7, title: 'sub node2' , 
				children: [ { id: 8, title: 'sub sub node2'}]
			}
		] ,
	}
];

export const tree2 = [
	{
		id: 9, 
		title: 'node1', 
		children: [
			{
				id: 10, 
				title: 'sub node1' ,
			}, 
			{ 
				id: 11, title: 'sub node1' , 
				children: []
			}
		] ,
	},
	{
		id: 12, 
		title: 'node2', 
		children: [
			{
				id: 13, 
				title: 'sub node2' ,
			}, 
			{ 
				id: 14, 
				title: 'sub node2' , 
				children: [ { id: 15, title: 'sub sub node2'}]
			}
		] ,
	}
];
