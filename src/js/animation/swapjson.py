import json

# Open the file for reading

filename = 'animationDog.json'
with open(filename) as f:
    # Load the JSON data from the file
    data = json.load(f)

# Print the loaded data

data = data["data"]

framearray = data['frames']

count =0 
for frames in framearray:
    for frame in frames:
        #{'translation': [0, 0, 0], 'rotation': [0, 0, 0], 'scalation': [10, 10, 10], 'translationSTree': [0, 0, 0], 'rotationSTree': [0, 0, 0], 'scalationSTree': [10, 10, 10]}
        #swap translation and withr translationSTree
        temp = frame['translation']
        frame['translation'] = frame['translationSTree']
        frame['translationSTree'] = temp

        #swap rotation and withr rotationSTree
        temp = frame['rotation']
        frame['rotation'] = frame['rotationSTree']
        frame['rotationSTree'] = temp

        #swap scalation and withr scalationSTree
        temp = frame['scalation']
        frame['scalation'] = frame['scalationSTree']

        print(frame)

jsonnn = {"type": "animation", "data": {"frames": framearray}}

#save jsonn into file
with open('animationDog2.json', 'w') as outfile:
    json.dump(jsonnn, outfile)

