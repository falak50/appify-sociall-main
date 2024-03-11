const posts = [
    {
        'postId': '12312',
        'userId': '2134',
        'name': 'Karim Saif', 
        'postText': '-Healthy Tracking App',
        'time':'3/6/2024, 6:39:18 AM',
        'reactCount': 10,
        'isReact':false,
        'shareCount': 10,
        'commentCount': 2,
        'comments': [
            {
                'commentId': '123',
                'CommenterName': 'Jahan Karim',
                'commenterUserId': '111', 
                'commentReactCount': 10,
                'commentText': 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout',
                'subComments': [
                    {
                        'subCommentId': '313',
                        'subCommenterUserId': '222',
                        'subCommenterUsername': 'Rifat Rahman',
                        'subCommentText': 'Yes you are right'
                    },
                    {
                        'subCommentId': '314',
                        'subCommenterUserId': '222',
                        'subCommenterUsername': 'Anjum Rahman',
                        'subCommentText': 'Yes you are right'
                    }
                ]
            }
        ]
    },
    {
        'postId': '56789',
        'userId': '5678',
        'name': 'Alice Smith', 
        'postText': 'Excited to announce the launch of our new product!',
        'reactCount': 20,
        'isReact':false,
        'shareCount': 5,
        'commentCount': 3,
        'time':'2/6/2024, 4:20:18 AM',
        'comments': [
            {
                'commentId': '456',
                'CommenterName': 'Bob Johnson',
                'commenterUserId': '789', 
                'commentReactCount': 15,
                'commentText': 'This is amazing news! Congratulations!',
                'subComments': []
            },
            {
                'commentId': '457',
                'CommenterName': 'Emily Brown',
                'commenterUserId': '4321', 
                'commentReactCount': 5,
                'commentText': 'Looking forward to trying it out!',
                'subComments': []
            }
        ]
    },
    {
        'postId': '98765',
        'userId': '4321',
        'name': 'Emily Brown', 
        'postText': 'Just finished reading a great book. Highly recommend!',
        'reactCount': 15,
        'isReact':false,
        'shareCount': 8,
        'commentCount': 1,
        'time':'1/4/2024, 1:45:23 AM',
        'comments': [
            {
                'commentId': '789',
                'CommenterName': 'Karim Saif',
                'commenterUserId': '2134', 
                'commentReactCount': 20,
                'commentText': 'What book did you read? I need a new recommendation!',
                'subComments': []
            }
        ]
    }
];

export default posts;
