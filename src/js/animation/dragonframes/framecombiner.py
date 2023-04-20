import json

# Open the file for reading

jsonnn = {"type": "animation", "data": {"frames": []}}

start = 3
end = 21 +1

for i in range(start, end):
    filename = f'frame ({i}).json'
    with open(filename) as f:
        # Load the JSON data from the file
        data = json.load(f)
        jsonnn["data"]["frames"].append(data["data"]["transformations"])



# save jsonn into file
with open('final.json', 'w') as outfile:
    json.dump(jsonnn, outfile)