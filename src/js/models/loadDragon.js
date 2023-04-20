function loadDragon(){
    gl.clearColor(0.9296875, 0.91015625, 0.8515625, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    body = new Block(origin = [-20,0,-12.5],25,15,25, obj_name = "Body" ); 
    
    neck_left_1 = new Block(origin = [5,3.5,-11.5],7,22,7, obj_name = "LeftNeck" )
    neck_mid_1 = new Block(origin = [5,3.5,-3.5],7,22,7, obj_name = "MiddleNeck" )
    neck_right_1 = new Block(origin = [5,3.5,4.5],7,22,7, obj_name = "RightNeck" )

    head_left = new Block(origin = [4.25,18.5,-11.75],15,6,7.5, obj_name = "LeftHead"  )
    head_mid = new Block(origin = [4.25,18.5,-3.75], 15,6,7.5, obj_name = "MiddleHead" )
    head_right = new Block(origin =  [4.25,18.5,4.25], 15,6,7.5, obj_name = "RightHead" )

    maw_left = new Block(origin = [9.25,16.5,-11],9 ,2   ,6, obj_name = "LeftMaw"  )
    maw_mid = new Block(origin = [9.25,16.5,-3], 9  ,2    ,6, obj_name = "MiddleMaw" )
    maw_right = new Block(origin =  [9.25,16.5,5],9 ,2  ,6, obj_name = "RightMaw" )

    fireball_left_1 = new Block(    origin = [9.25 -0.1 , 20.5 - 0.1,   -8.5 -0.1   ],   1.2,  1.2,  1.2, obj_name = "LeftFireball1"  )
    fireball_left_2 = new Block(    origin = [9.25 -0.05, 20.5 -0.05,   -8.5 -0.05  ],   1.1,  1.1,  1.1, obj_name = "LeftFireball2"  )
    fireball_left_3 = new Block(    origin = [9.25      , 20.5      ,   -8.5        ],   1,  1,  1, obj_name = "LeftFireball3"  )

    fireball_mid_1 = new Block(     origin = [9.25 -0.1 , 20.5 - 0.1,    -0.5 -0.1  ],    1.2,  1.2,  1.2, obj_name = "MiddleFireball1"  )
    fireball_mid_2 = new Block(     origin = [9.25 -0.05, 20.5 -0.05,    -0.5 -0.05 ],    1.1,  1.1,  1.1, obj_name = "MiddleFireball3"  )
    fireball_mid_3 = new Block(     origin = [9.25      , 20.5      ,    -0.5       ],    1,  1,  1, obj_name = "MiddleFireball2"  )

    fireball_right_1 =  new Block(  origin = [9.25 -0.1 , 20.5 - 0.1,   7.5   -0.1   ] , 1.2,  1.2,  1.2, obj_name = "RightFireball1"  )
    fireball_right_2 =  new Block(  origin = [9.25 -0.05, 20.5 -0.05,   7.5 -0.05    ] , 1.1,  1.1,  1.1, obj_name = "RightFireball2"  )
    fireball_right_3 =  new Block(  origin = [9.25      , 20.5      ,   7.5          ], 1,  1,  1, obj_name = "RightFireball3"  )





    wing_left_mid = new Block(origin = [-15.5,14.75,-21.5],15,0.75,9, obj_name = "LeftMainWing" )

    wing_right_mid = new Block(origin = [-15.5,14.75,12.5],15,0.75,9, obj_name = "RightMainWing" )

    leg_left = new Block(origin = [-12.5,-9,-14.5],10,18,7, obj_name = "LeftLeg" )
    leg_right = new Block(origin = [-12.5,-9,7.5],10,18,7, obj_name = "RightLeg" )

    tail_1 = new Block(origin = [-28,7,-10]   ,8,  7, 20, obj_name = "Tail1" )
    tail_2 = new Block(origin = [-35,6.75,-8] ,7,  5,   16, obj_name = "Tail2" )
    tail_3 = new Block(origin = [-41,6.5,-6.5]  ,6,  4.5, 13, obj_name = "Tail3" )
    tail_4 = new Block(origin = [-46,6.25,-5.5]  ,5,  4,   11, obj_name = "Tail4" )
    tail_5 = new Block(origin = [-52,6.5,-6.5]  ,6,  4.5, 13, obj_name = "Tail5" )
    tail_6 = new Block(origin = [-57,6.25,-2.5]  ,5,  4,   5, obj_name = "Tail6" )

    body.appendChild(neck_left_1)
    body.appendChild(neck_mid_1)
    body.appendChild(neck_right_1)

    neck_left_1.appendChild(head_left)
    neck_mid_1.appendChild(head_mid)
    neck_right_1.appendChild(head_right)

    head_left.appendChild(maw_left)
    head_mid.appendChild(maw_mid)
    head_right.appendChild(maw_right)

    maw_left.appendChild(fireball_left_1)
    fireball_left_1.appendChild(fireball_left_2)
    fireball_left_2.appendChild(fireball_left_3)

    maw_mid.appendChild(fireball_mid_1)
    fireball_mid_1.appendChild(fireball_mid_2)
    fireball_mid_2.appendChild(fireball_mid_3)

    maw_right.appendChild(fireball_right_1)
    fireball_right_1.appendChild(fireball_right_2)
    fireball_right_2.appendChild(fireball_right_3)

    body.appendChild(wing_left_mid)

    body.appendChild(wing_right_mid)

    body.appendChild(tail_1)
    tail_1.appendChild(tail_2)
    tail_2.appendChild(tail_3)
    tail_3.appendChild(tail_4)
    tail_4.appendChild(tail_5)
    tail_5.appendChild(tail_6)

    body.appendChild(leg_left)
    body.appendChild(leg_right)

    shapes.push(body);
    

}