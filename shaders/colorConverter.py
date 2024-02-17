# function to convert a 2d list of hex color stirings to glsl vec3 format and save to a file
# input: palette list of hex color strings, filename to save to
# output: file with glsl vec3 color strings
def convertColors(palettes, filename):
    with open(filename, "w") as file:
        # get the length of palettes and write the color array
        file.write(f"vec3 color[{len(palettes)}];\n")
        for i, palette in enumerate(palettes):
            file.write(f"color[{i}] = mix4(\n")
            for color in palette:
                r = int(color[1:3], 16) / 255
                g = int(color[3:5], 16) / 255
                b = int(color[5:7], 16) / 255
                file.write(f"vec3({r}, {g}, {b}),\n")
            file.write("vec2(vDisplacement, vDisplacement));\n")
            file.write("\n")
        file.close()

palettes = [
    ["#FFF67E", "#BFEA7C", "#9BCF53", "#416D19"],
    ["#070F2B", "#1B1A55", "#535C91", "#9290C3"],
    ["#7F27FF", "#9F70FD", "#FDBF60", "#FF8911"],
    ["#FFF7F1", "#FFE4C9", "#E78895", "#BED1CF"],
    ["#12372A", "#436850", "#ADBC9F", "#FBFADA"],
    ["#D04848", "#F3B95F", "#FDE767", "#6895D2"],
]
convertColors(palettes, "./fragment_colors.glsl")
