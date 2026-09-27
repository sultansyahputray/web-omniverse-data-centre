import json

# Time steps
TIME_STEPS = ["0", "6", "12", "18", "24", "30", "36", "42", "48", "54"]

# ==========================================
# 1. COMPUTING DETAILS (Racks 1 to 9)
# Format for each rack:
# "Low Load": [ { "cpu": ..., "gpu": ..., "gpuMemory": ..., "memory": ..., "disk": ..., "network": ... }, (10 items) ]
# "Medium Load": [ (10 items) ]
# "High Load": [ (10 items) ]
# ==========================================

comp_details = {
    "rack_1": {
        "name": "Rack 1",
        "Low Load": [
            {"cpu": 22, "gpu": 26.57, "gpuMemory": 22.19, "memory": 31.55, "disk": 22, "network": 23.37},
            {"cpu": 21, "gpu": 23.19, "gpuMemory": 20.68, "memory": 32.78, "disk": 22, "network": 23.57},
            {"cpu": 22, "gpu": 26.27, "gpuMemory": 22.30, "memory": 32.22, "disk": 23, "network": 22.55},
            {"cpu": 21, "gpu": 23.54, "gpuMemory": 21.14, "memory": 32.35, "disk": 21, "network": 23.47},
            {"cpu": 24, "gpu": 24.71, "gpuMemory": 21.13, "memory": 32.50, "disk": 20, "network": 20.24},
            {"cpu": 21, "gpu": 27.63, "gpuMemory": 20.66, "memory": 33.55, "disk": 23, "network": 23.14},
            {"cpu": 23, "gpu": 23.40, "gpuMemory": 23.79, "memory": 32.30, "disk": 22, "network": 22.77},
            {"cpu": 20, "gpu": 27.15, "gpuMemory": 20.19, "memory": 33.24, "disk": 22, "network": 23.81},
            {"cpu": 23, "gpu": 24.81, "gpuMemory": 22.82, "memory": 30.27, "disk": 22, "network": 23.76},
            {"cpu": 23, "gpu": 27.48, "gpuMemory": 21.13, "memory": 32.74, "disk": 22, "network": 20.14}
        ],
        "Medium Load": [
            {"cpu": 49, "gpu": 68.22, "gpuMemory": 50.78, "memory": 47.82, "disk": 49, "network": 49.72},
            {"cpu": 48, "gpu": 65.73, "gpuMemory": 48.68, "memory": 51.79, "disk": 51, "network": 50.59},
            {"cpu": 49, "gpu": 67.14, "gpuMemory": 47.73, "memory": 50.32, "disk": 48, "network": 51.68},
            {"cpu": 49, "gpu": 65.16, "gpuMemory": 50.24, "memory": 50.87, "disk": 50, "network": 49.62},
            {"cpu": 48, "gpu": 69.53, "gpuMemory": 48.24, "memory": 49.56, "disk": 49, "network": 48.84},
            {"cpu": 49, "gpu": 67.70, "gpuMemory": 47.57, "memory": 49.49, "disk": 50, "network": 48.63},
            {"cpu": 51, "gpu": 67.02, "gpuMemory": 48.20, "memory": 50.80, "disk": 51, "network": 51.20},
            {"cpu": 50, "gpu": 68.16, "gpuMemory": 48.72, "memory": 49.10, "disk": 50, "network": 50.70},
            {"cpu": 51, "gpu": 69.32, "gpuMemory": 49.25, "memory": 49.19, "disk": 49, "network": 50.87},
            {"cpu": 48, "gpu": 69.38, "gpuMemory": 49.64, "memory": 50.72, "disk": 47, "network": 51.33}
        ],
        "High Load": [
            {"cpu": 61, "gpu": 93.96, "gpuMemory": 76.58, "memory": 76.53, "disk": 70, "network": 70.50},
            {"cpu": 62, "gpu": 93.38, "gpuMemory": 75.19, "memory": 75.62, "disk": 70, "network": 72.43},
            {"cpu": 61, "gpu": 92.88, "gpuMemory": 74.31, "memory": 76.76, "disk": 73, "network": 71.76},
            {"cpu": 66, "gpu": 95.18, "gpuMemory": 74.54, "memory": 76.60, "disk": 72, "network": 69.64},
            {"cpu": 61, "gpu": 97.40, "gpuMemory": 76.32, "memory": 76.54, "disk": 71, "network": 70.72},
            {"cpu": 67, "gpu": 92.57, "gpuMemory": 75.52, "memory": 76.36, "disk": 69, "network": 72.39},
            {"cpu": 64, "gpu": 92.15, "gpuMemory": 75.50, "memory": 75.67, "disk": 69, "network": 70.86},
            {"cpu": 62, "gpu": 93.30, "gpuMemory": 74.35, "memory": 73.19, "disk": 72, "network": 71.37},
            {"cpu": 62, "gpu": 96.71, "gpuMemory": 75.90, "memory": 73.66, "disk": 71, "network": 69.11},
            {"cpu": 60, "gpu": 96.55, "gpuMemory": 75.70, "memory": 74.85, "disk": 71, "network": 70.65}
        ]
    },
    "rack_2": {
        "name": "Rack 2",
        "Low Load": [
            {"cpu": 27, "gpu": 32.13, "gpuMemory": 23.80, "memory": 33.54, "disk": 24, "network": 26.79},
            {"cpu": 27, "gpu": 33.34, "gpuMemory": 23.13, "memory": 32.81, "disk": 23, "network": 26.63},
            {"cpu": 23, "gpu": 28.97, "gpuMemory": 24.89, "memory": 34.24, "disk": 25, "network": 25.56},
            {"cpu": 24, "gpu": 28.54, "gpuMemory": 22.37, "memory": 36.70, "disk": 23, "network": 24.12},
            {"cpu": 27, "gpu": 28.69, "gpuMemory": 23.20, "memory": 35.22, "disk": 23, "network": 25.13},
            {"cpu": 25, "gpu": 29.14, "gpuMemory": 26.21, "memory": 32.12, "disk": 22, "network": 24.54},
            {"cpu": 22, "gpu": 28.18, "gpuMemory": 22.27, "memory": 33.53, "disk": 22, "network": 26.19},
            {"cpu": 22, "gpu": 28.68, "gpuMemory": 23.37, "memory": 34.30, "disk": 25, "network": 23.78},
            {"cpu": 26, "gpu": 32.09, "gpuMemory": 22.18, "memory": 33.79, "disk": 27, "network": 24.53},
            {"cpu": 27, "gpu": 27.11, "gpuMemory": 22.24, "memory": 34.58, "disk": 24, "network": 23.85}
        ],
        "Medium Load": [
            {"cpu": 50, "gpu": 70.14, "gpuMemory": 51.48, "memory": 49.78, "disk": 52, "network": 51.52},
            {"cpu": 50, "gpu": 72.34, "gpuMemory": 50.62, "memory": 49.80, "disk": 47, "network": 49.71},
            {"cpu": 52, "gpu": 70.08, "gpuMemory": 48.14, "memory": 47.69, "disk": 51, "network": 51.80},
            {"cpu": 50, "gpu": 73.81, "gpuMemory": 47.87, "memory": 48.42, "disk": 49, "network": 47.63},
            {"cpu": 51, "gpu": 71.47, "gpuMemory": 48.24, "memory": 49.62, "disk": 49, "network": 47.82},
            {"cpu": 49, "gpu": 71.10, "gpuMemory": 47.24, "memory": 50.81, "disk": 49, "network": 47.37},
            {"cpu": 51, "gpu": 69.10, "gpuMemory": 47.12, "memory": 50.16, "disk": 47, "network": 48.58},
            {"cpu": 49, "gpu": 71.78, "gpuMemory": 51.68, "memory": 49.79, "disk": 50, "network": 51.75},
            {"cpu": 49, "gpu": 73.67, "gpuMemory": 48.24, "memory": 50.26, "disk": 50, "network": 50.64},
            {"cpu": 49, "gpu": 68.57, "gpuMemory": 47.77, "memory": 49.41, "disk": 48, "network": 48.67}
        ],
        "High Load": [
            {"cpu": 62, "gpu": 96.50, "gpuMemory": 74.65, "memory": 74.11, "disk": 72, "network": 69.35},
            {"cpu": 62, "gpu": 93.56, "gpuMemory": 75.19, "memory": 73.35, "disk": 71, "network": 70.30},
            {"cpu": 59, "gpu": 97.75, "gpuMemory": 75.29, "memory": 74.53, "disk": 69, "network": 68.76},
            {"cpu": 65, "gpu": 96.90, "gpuMemory": 76.15, "memory": 75.28, "disk": 71, "network": 68.11},
            {"cpu": 66, "gpu": 92.85, "gpuMemory": 76.76, "memory": 76.80, "disk": 69, "network": 71.26},
            {"cpu": 63, "gpu": 92.04, "gpuMemory": 74.25, "memory": 76.65, "disk": 72, "network": 70.67},
            {"cpu": 61, "gpu": 92.54, "gpuMemory": 76.87, "memory": 74.82, "disk": 69, "network": 72.48},
            {"cpu": 61, "gpu": 94.15, "gpuMemory": 75.59, "memory": 75.61, "disk": 71, "network": 70.32},
            {"cpu": 67, "gpu": 95.43, "gpuMemory": 74.16, "memory": 74.58, "disk": 70, "network": 69.55},
            {"cpu": 59, "gpu": 92.07, "gpuMemory": 76.85, "memory": 75.39, "disk": 71, "network": 68.66}
        ]
    },
    "rack_3": {
        "name": "Rack 3",
        "Low Load": [
            {"cpu": 31, "gpu": 41.45, "gpuMemory": 32.42, "memory": 41.34, "disk": 34, "network": 32.56},
            {"cpu": 34, "gpu": 38.46, "gpuMemory": 32.69, "memory": 44.74, "disk": 31, "network": 35.55},
            {"cpu": 35, "gpu": 41.01, "gpuMemory": 31.50, "memory": 43.43, "disk": 30, "network": 34.46},
            {"cpu": 35, "gpu": 42.71, "gpuMemory": 31.67, "memory": 40.89, "disk": 35, "network": 30.29},
            {"cpu": 30, "gpu": 40.95, "gpuMemory": 30.58, "memory": 44.26, "disk": 31, "network": 31.15},
            {"cpu": 34, "gpu": 39.80, "gpuMemory": 32.47, "memory": 42.77, "disk": 32, "network": 31.14},
            {"cpu": 33, "gpu": 40.87, "gpuMemory": 32.63, "memory": 40.62, "disk": 32, "network": 35.85},
            {"cpu": 35, "gpu": 43.18, "gpuMemory": 33.85, "memory": 41.81, "disk": 34, "network": 31.64},
            {"cpu": 35, "gpu": 39.48, "gpuMemory": 33.56, "memory": 44.27, "disk": 31, "network": 32.16},
            {"cpu": 36, "gpu": 36.06, "gpuMemory": 30.43, "memory": 40.72, "disk": 33, "network": 34.80}
        ],
        "Medium Load": [
            {"cpu": 58, "gpu": 72.37, "gpuMemory": 54.31, "memory": 54.72, "disk": 55, "network": 54.74},
            {"cpu": 56, "gpu": 66.64, "gpuMemory": 54.36, "memory": 57.47, "disk": 53, "network": 54.23},
            {"cpu": 54, "gpu": 72.21, "gpuMemory": 52.41, "memory": 53.22, "disk": 58, "network": 53.21},
            {"cpu": 53, "gpu": 67.80, "gpuMemory": 51.89, "memory": 51.50, "disk": 52, "network": 53.79},
            {"cpu": 54, "gpu": 67.94, "gpuMemory": 53.12, "memory": 57.62, "disk": 53, "network": 57.52},
            {"cpu": 57, "gpu": 73.75, "gpuMemory": 51.14, "memory": 52.63, "disk": 52, "network": 51.77},
            {"cpu": 59, "gpu": 71.04, "gpuMemory": 54.86, "memory": 55.41, "disk": 57, "network": 53.37},
            {"cpu": 58, "gpu": 74.77, "gpuMemory": 51.82, "memory": 55.24, "disk": 54, "network": 56.67},
            {"cpu": 53, "gpu": 74.83, "gpuMemory": 57.29, "memory": 55.47, "disk": 56, "network": 55.89},
            {"cpu": 56, "gpu": 73.88, "gpuMemory": 51.44, "memory": 52.87, "disk": 53, "network": 53.86}
        ],
        "High Load": [
            {"cpu": 76, "gpu": 92.84, "gpuMemory": 80.17, "memory": 77.59, "disk": 75, "network": 79.36},
            {"cpu": 75, "gpu": 96.50, "gpuMemory": 80.80, "memory": 81.14, "disk": 76, "network": 80.12},
            {"cpu": 72, "gpu": 93.86, "gpuMemory": 78.15, "memory": 81.78, "disk": 78, "network": 79.77},
            {"cpu": 74, "gpu": 96.60, "gpuMemory": 81.84, "memory": 82.26, "disk": 76, "network": 73.79},
            {"cpu": 73, "gpu": 93.44, "gpuMemory": 77.81, "memory": 77.22, "disk": 74, "network": 80.77},
            {"cpu": 69, "gpu": 96.48, "gpuMemory": 82.64, "memory": 80.14, "disk": 80, "network": 76.10},
            {"cpu": 77, "gpu": 95.66, "gpuMemory": 81.49, "memory": 81.10, "disk": 77, "network": 74.77},
            {"cpu": 75, "gpu": 90.80, "gpuMemory": 79.38, "memory": 77.28, "disk": 77, "network": 78.56},
            {"cpu": 74, "gpu": 89.88, "gpuMemory": 77.11, "memory": 79.73, "disk": 75, "network": 73.68},
            {"cpu": 76, "gpu": 95.41, "gpuMemory": 81.17, "memory": 80.62, "disk": 74, "network": 77.74}
        ]
    },
    "rack_4": {
        "name": "Rack 4",
        "Low Load": [
            {"cpu": 74, "gpu": 83.82, "gpuMemory": 71.39, "memory": 75.82, "disk": 75, "network": 70.61},
            {"cpu": 75, "gpu": 88.33, "gpuMemory": 69.43, "memory": 70.60, "disk": 74, "network": 72.79},
            {"cpu": 76, "gpu": 84.31, "gpuMemory": 75.47, "memory": 71.47, "disk": 74, "network": 75.42},
            {"cpu": 76, "gpu": 87.90, "gpuMemory": 60.60, "memory": 60.79, "disk": 70, "network": 74.61},
            {"cpu": 76, "gpu": 84.74, "gpuMemory": 69.41, "memory": 70.22, "disk": 69, "network": 73.37},
            {"cpu": 80, "gpu": 84.94, "gpuMemory": 69.26, "memory": 73.13, "disk": 70, "network": 71.26},
            {"cpu": 77, "gpu": 84.36, "gpuMemory": 72.80, "memory": 75.51, "disk": 75, "network": 72.31},
            {"cpu": 80, "gpu": 83.23, "gpuMemory": 74.62, "memory": 69.25, "disk": 72, "network": 73.42},
            {"cpu": 74, "gpu": 80.71, "gpuMemory": 74.44, "memory": 74.26, "disk": 76, "network": 69.77},
            {"cpu": 78, "gpu": 81.30, "gpuMemory": 73.71, "memory": 69.52, "disk": 71, "network": 74.55}
        ],
        "Medium Load": [
            {"cpu": 78, "gpu": 88.03, "gpuMemory": 70.19, "memory": 74.32, "disk": 70, "network": 72.63},
            {"cpu": 79, "gpu": 84.94, "gpuMemory": 72.61, "memory": 71.81, "disk": 74, "network": 70.71},
            {"cpu": 78, "gpu": 82.33, "gpuMemory": 74.19, "memory": 74.25, "disk": 70, "network": 72.57},
            {"cpu": 74, "gpu": 86.98, "gpuMemory": 69.65, "memory": 74.52, "disk": 76, "network": 75.40},
            {"cpu": 79, "gpu": 83.63, "gpuMemory": 71.83, "memory": 69.50, "disk": 76, "network": 72.23},
            {"cpu": 74, "gpu": 80.82, "gpuMemory": 73.51, "memory": 70.83, "disk": 71, "network": 70.47},
            {"cpu": 77, "gpu": 84.85, "gpuMemory": 71.58, "memory": 72.18, "disk": 72, "network": 75.49},
            {"cpu": 79, "gpu": 88.44, "gpuMemory": 74.43, "memory": 71.79, "disk": 74, "network": 70.60},
            {"cpu": 77, "gpu": 88.40, "gpuMemory": 75.73, "memory": 74.82, "disk": 78, "network": 71.89},
            {"cpu": 75, "gpu": 82.01, "gpuMemory": 73.22, "memory": 72.26, "disk": 74, "network": 70.22}
        ],
        "High Load": [
            {"cpu": 92, "gpu": 92.82, "gpuMemory": 85.60, "memory": 91.63, "disk": 85, "network": 84.80},
            {"cpu": 79, "gpu": 88.42, "gpuMemory": 85.22, "memory": 88.15, "disk": 85, "network": 89.55},
            {"cpu": 85, "gpu": 86.39, "gpuMemory": 84.27, "memory": 90.79, "disk": 84, "network": 89.15},
            {"cpu": 89, "gpu": 87.04, "gpuMemory": 88.48, "memory": 86.16, "disk": 86, "network": 81.87},
            {"cpu": 88, "gpu": 96.87, "gpuMemory": 92.43, "memory": 91.80, "disk": 91, "network": 90.22},
            {"cpu": 80, "gpu": 89.23, "gpuMemory": 86.59, "memory": 92.57, "disk": 91, "network": 89.68},
            {"cpu": 89, "gpu": 93.29, "gpuMemory": 89.37, "memory": 89.60, "disk": 89, "network": 87.72},
            {"cpu": 89, "gpu": 93.97, "gpuMemory": 93.52, "memory": 85.54, "disk": 88, "network": 90.10},
            {"cpu": 86, "gpu": 97.01, "gpuMemory": 87.72, "memory": 93.72, "disk": 85, "network": 81.55},
            {"cpu": 79, "gpu": 97.09, "gpuMemory": 87.48, "memory": 86.63, "disk": 89, "network": 81.41}
        ]
    },
    "rack_5": {
        "name": "Rack 5",
        "Low Load": [
            {"cpu": 35, "gpu": 36.71, "gpuMemory": 30.86, "memory": 45.39, "disk": 36, "network": 33.47},
            {"cpu": 34, "gpu": 39.72, "gpuMemory": 34.46, "memory": 40.38, "disk": 33, "network": 34.77},
            {"cpu": 32, "gpu": 38.31, "gpuMemory": 34.75, "memory": 43.41, "disk": 34, "network": 33.77},
            {"cpu": 34, "gpu": 42.98, "gpuMemory": 33.27, "memory": 40.80, "disk": 32, "network": 32.81},
            {"cpu": 30, "gpu": 36.67, "gpuMemory": 35.28, "memory": 41.27, "disk": 32, "network": 34.70},
            {"cpu": 35, "gpu": 40.09, "gpuMemory": 31.85, "memory": 40.43, "disk": 35, "network": 30.17},
            {"cpu": 36, "gpu": 39.98, "gpuMemory": 33.25, "memory": 44.59, "disk": 35, "network": 35.23},
            {"cpu": 31, "gpu": 36.48, "gpuMemory": 32.20, "memory": 41.41, "disk": 31, "network": 32.67},
            {"cpu": 31, "gpu": 38.98, "gpuMemory": 31.61, "memory": 43.80, "disk": 33, "network": 32.43},
            {"cpu": 31, "gpu": 42.95, "gpuMemory": 30.79, "memory": 44.31, "disk": 35, "network": 35.75}
        ],
        "Medium Load": [
            {"cpu": 57, "gpu": 69.17, "gpuMemory": 53.77, "memory": 54.25, "disk": 54, "network": 57.82},
            {"cpu": 55, "gpu": 70.51, "gpuMemory": 52.62, "memory": 52.36, "disk": 51, "network": 56.55},
            {"cpu": 58, "gpu": 69.76, "gpuMemory": 55.40, "memory": 52.35, "disk": 56, "network": 56.17},
            {"cpu": 59, "gpu": 68.92, "gpuMemory": 56.76, "memory": 56.43, "disk": 53, "network": 56.76},
            {"cpu": 52, "gpu": 71.60, "gpuMemory": 55.75, "memory": 54.60, "disk": 55, "network": 56.42},
            {"cpu": 56, "gpu": 68.43, "gpuMemory": 57.80, "memory": 53.61, "disk": 52, "network": 51.65},
            {"cpu": 52, "gpu": 71.34, "gpuMemory": 51.82, "memory": 52.63, "disk": 56, "network": 53.61},
            {"cpu": 55, "gpu": 71.43, "gpuMemory": 53.29, "memory": 54.35, "disk": 52, "network": 54.29},
            {"cpu": 53, "gpu": 70.17, "gpuMemory": 52.25, "memory": 52.13, "disk": 51, "network": 55.45},
            {"cpu": 57, "gpu": 72.83, "gpuMemory": 51.15, "memory": 57.50, "disk": 57, "network": 57.83}
        ],
        "High Load": [
            {"cpu": 76, "gpu": 87.82, "gpuMemory": 78.32, "memory": 80.34, "disk": 77, "network": 78.79},
            {"cpu": 68, "gpu": 88.06, "gpuMemory": 78.24, "memory": 79.13, "disk": 74, "network": 80.24},
            {"cpu": 74, "gpu": 93.20, "gpuMemory": 82.83, "memory": 82.40, "disk": 73, "network": 78.65},
            {"cpu": 75, "gpu": 93.30, "gpuMemory": 78.40, "memory": 82.13, "disk": 79, "network": 77.84},
            {"cpu": 78, "gpu": 90.46, "gpuMemory": 77.31, "memory": 77.70, "disk": 79, "network": 74.77},
            {"cpu": 68, "gpu": 88.32, "gpuMemory": 78.86, "memory": 81.82, "disk": 76, "network": 74.63},
            {"cpu": 67, "gpu": 90.50, "gpuMemory": 78.19, "memory": 81.44, "disk": 73, "network": 75.90},
            {"cpu": 76, "gpu": 96.91, "gpuMemory": 79.57, "memory": 83.86, "disk": 76, "network": 78.57},
            {"cpu": 69, "gpu": 93.95, "gpuMemory": 78.70, "memory": 80.49, "disk": 74, "network": 75.63},
            {"cpu": 75, "gpu": 90.22, "gpuMemory": 80.71, "memory": 78.39, "disk": 75, "network": 73.60}
        ]
    },
    "rack_6": {
        "name": "Rack 6",
        "Low Load": [
            {"cpu": 32, "gpu": 39.50, "gpuMemory": 30.66, "memory": 44.70, "disk": 32, "network": 32.80},
            {"cpu": 32, "gpu": 41.12, "gpuMemory": 35.56, "memory": 43.72, "disk": 31, "network": 35.90},
            {"cpu": 31, "gpu": 38.21, "gpuMemory": 35.57, "memory": 42.37, "disk": 33, "network": 35.41},
            {"cpu": 32, "gpu": 44.70, "gpuMemory": 32.72, "memory": 40.34, "disk": 32, "network": 32.80},
            {"cpu": 35, "gpu": 38.54, "gpuMemory": 35.55, "memory": 40.24, "disk": 33, "network": 33.22},
            {"cpu": 33, "gpu": 44.30, "gpuMemory": 32.31, "memory": 40.26, "disk": 36, "network": 33.18},
            {"cpu": 30, "gpu": 36.83, "gpuMemory": 35.25, "memory": 40.67, "disk": 31, "network": 33.14},
            {"cpu": 34, "gpu": 41.86, "gpuMemory": 33.49, "memory": 42.73, "disk": 31, "network": 31.34},
            {"cpu": 35, "gpu": 43.04, "gpuMemory": 31.24, "memory": 41.57, "disk": 31, "network": 30.85},
            {"cpu": 36, "gpu": 43.28, "gpuMemory": 32.19, "memory": 43.76, "disk": 34, "network": 35.13}
        ],
        "Medium Load": [
            {"cpu": 54, "gpu": 74.12, "gpuMemory": 51.23, "memory": 52.64, "disk": 51, "network": 52.63},
            {"cpu": 53, "gpu": 77.81, "gpuMemory": 54.64, "memory": 52.22, "disk": 56, "network": 53.83},
            {"cpu": 58, "gpu": 68.72, "gpuMemory": 55.34, "memory": 51.72, "disk": 52, "network": 51.38},
            {"cpu": 55, "gpu": 75.78, "gpuMemory": 57.29, "memory": 53.37, "disk": 53, "network": 56.26},
            {"cpu": 58, "gpu": 72.70, "gpuMemory": 55.26, "memory": 56.57, "disk": 51, "network": 51.63},
            {"cpu": 53, "gpu": 72.20, "gpuMemory": 52.65, "memory": 57.51, "disk": 57, "network": 51.59},
            {"cpu": 55, "gpu": 69.19, "gpuMemory": 53.84, "memory": 53.52, "disk": 52, "network": 52.79},
            {"cpu": 55, "gpu": 75.07, "gpuMemory": 54.22, "memory": 52.79, "disk": 56, "network": 55.46},
            {"cpu": 56, "gpu": 69.86, "gpuMemory": 57.10, "memory": 55.15, "disk": 56, "network": 52.32},
            {"cpu": 58, "gpu": 70.75, "gpuMemory": 51.74, "memory": 54.19, "disk": 54, "network": 57.25}
        ],
        "High Load": [
            {"cpu": 72, "gpu": 93.36, "gpuMemory": 78.23, "memory": 80.57, "disk": 75, "network": 75.89},
            {"cpu": 72, "gpu": 87.89, "gpuMemory": 78.85, "memory": 79.12, "disk": 76, "network": 80.67},
            {"cpu": 69, "gpu": 94.19, "gpuMemory": 82.76, "memory": 81.47, "disk": 79, "network": 79.22},
            {"cpu": 76, "gpu": 90.66, "gpuMemory": 81.74, "memory": 81.32, "disk": 76, "network": 80.44},
            {"cpu": 69, "gpu": 90.84, "gpuMemory": 80.10, "memory": 80.71, "disk": 73, "network": 76.23},
            {"cpu": 67, "gpu": 89.27, "gpuMemory": 77.45, "memory": 83.72, "disk": 75, "network": 75.43},
            {"cpu": 75, "gpu": 92.86, "gpuMemory": 81.47, "memory": 77.27, "disk": 73, "network": 73.59},
            {"cpu": 72, "gpu": 94.67, "gpuMemory": 82.34, "memory": 83.33, "disk": 75, "network": 74.54},
            {"cpu": 67, "gpu": 96.26, "gpuMemory": 81.65, "memory": 79.54, "disk": 70, "network": 76.71},
            {"cpu": 77, "gpu": 91.72, "gpuMemory": 82.11, "memory": 82.61, "disk": 77, "network": 74.51}
        ]
    },
    "rack_7": {
        "name": "Rack 7",
        "Low Load": [
            {"cpu": 44, "gpu": 50.24, "gpuMemory": 47.18, "memory": 53.51, "disk": 48, "network": 48.49},
            {"cpu": 46, "gpu": 53.08, "gpuMemory": 46.39, "memory": 52.55, "disk": 47, "network": 45.37},
            {"cpu": 47, "gpu": 58.83, "gpuMemory": 45.14, "memory": 50.90, "disk": 50, "network": 45.25},
            {"cpu": 50, "gpu": 58.74, "gpuMemory": 48.42, "memory": 55.35, "disk": 47, "network": 49.58},
            {"cpu": 44, "gpu": 50.05, "gpuMemory": 46.58, "memory": 52.65, "disk": 45, "network": 45.12},
            {"cpu": 44, "gpu": 53.04, "gpuMemory": 50.52, "memory": 54.79, "disk": 51, "network": 46.37},
            {"cpu": 40, "gpu": 49.74, "gpuMemory": 45.58, "memory": 54.28, "disk": 47, "network": 48.11},
            {"cpu": 47, "gpu": 52.81, "gpuMemory": 49.23, "memory": 53.52, "disk": 44, "network": 47.62},
            {"cpu": 50, "gpu": 53.01, "gpuMemory": 48.56, "memory": 51.14, "disk": 46, "network": 48.13},
            {"cpu": 48, "gpu": 49.49, "gpuMemory": 44.59, "memory": 54.75, "disk": 45, "network": 50.14}
        ],
        "Medium Load": [
            {"cpu": 69, "gpu": 86.55, "gpuMemory": 58.70, "memory": 58.85, "disk": 63, "network": 65.44},
            {"cpu": 68, "gpu": 78.75, "gpuMemory": 61.23, "memory": 65.68, "disk": 65, "network": 59.44},
            {"cpu": 64, "gpu": 80.63, "gpuMemory": 60.55, "memory": 59.27, "disk": 59, "network": 58.83},
            {"cpu": 63, "gpu": 83.52, "gpuMemory": 58.46, "memory": 65.64, "disk": 66, "network": 57.41},
            {"cpu": 62, "gpu": 82.07, "gpuMemory": 60.29, "memory": 63.83, "disk": 64, "network": 59.26},
            {"cpu": 69, "gpu": 84.64, "gpuMemory": 60.56, "memory": 58.55, "disk": 65, "network": 65.69},
            {"cpu": 69, "gpu": 82.30, "gpuMemory": 60.66, "memory": 65.24, "disk": 60, "network": 59.83},
            {"cpu": 64, "gpu": 88.78, "gpuMemory": 57.50, "memory": 57.76, "disk": 65, "network": 58.27},
            {"cpu": 63, "gpu": 83.03, "gpuMemory": 59.75, "memory": 60.73, "disk": 58, "network": 63.53},
            {"cpu": 66, "gpu": 78.84, "gpuMemory": 60.66, "memory": 65.22, "disk": 62, "network": 60.31}
        ],
        "High Load": [
            {"cpu": 84, "gpu": 88.83, "gpuMemory": 90.86, "memory": 90.50, "disk": 83, "network": 85.58},
            {"cpu": 81, "gpu": 94.48, "gpuMemory": 91.56, "memory": 91.78, "disk": 86, "network": 88.83},
            {"cpu": 79, "gpu": 90.08, "gpuMemory": 91.71, "memory": 90.51, "disk": 82, "network": 82.29},
            {"cpu": 89, "gpu": 96.54, "gpuMemory": 87.67, "memory": 90.16, "disk": 88, "network": 89.52},
            {"cpu": 90, "gpu": 88.57, "gpuMemory": 91.46, "memory": 87.74, "disk": 80, "network": 84.19},
            {"cpu": 91, "gpu": 95.32, "gpuMemory": 84.36, "memory": 84.24, "disk": 90, "network": 86.77},
            {"cpu": 90, "gpu": 96.54, "gpuMemory": 85.29, "memory": 88.80, "disk": 83, "network": 80.80},
            {"cpu": 88, "gpu": 89.30, "gpuMemory": 90.67, "memory": 93.72, "disk": 87, "network": 81.26},
            {"cpu": 92, "gpu": 98.57, "gpuMemory": 93.29, "memory": 88.90, "disk": 82, "network": 90.31},
            {"cpu": 85, "gpu": 97.55, "gpuMemory": 85.24, "memory": 90.81, "disk": 81, "network": 84.35}
        ]
    },
    "rack_8": {
        "name": "Rack 8",
        "Low Load": [
            {"cpu": 30, "gpu": 41.71, "gpuMemory": 33.22, "memory": 44.77, "disk": 36, "network": 30.46},
            {"cpu": 36, "gpu": 40.82, "gpuMemory": 32.47, "memory": 43.72, "disk": 32, "network": 31.37},
            {"cpu": 34, "gpu": 36.18, "gpuMemory": 30.82, "memory": 42.29, "disk": 35, "network": 35.48},
            {"cpu": 35, "gpu": 36.65, "gpuMemory": 34.03, "memory": 44.58, "disk": 35, "network": 33.77},
            {"cpu": 31, "gpu": 36.85, "gpuMemory": 33.46, "memory": 42.80, "disk": 35, "network": 30.84},
            {"cpu": 35, "gpu": 42.90, "gpuMemory": 34.40, "memory": 41.66, "disk": 35, "network": 31.47},
            {"cpu": 34, "gpu": 41.40, "gpuMemory": 30.18, "memory": 40.25, "disk": 34, "network": 31.16},
            {"cpu": 34, "gpu": 41.23, "gpuMemory": 34.70, "memory": 43.87, "disk": 36, "network": 35.35},
            {"cpu": 32, "gpu": 36.88, "gpuMemory": 33.88, "memory": 42.70, "disk": 35, "network": 31.82},
            {"cpu": 32, "gpu": 41.59, "gpuMemory": 33.10, "memory": 44.89, "disk": 32, "network": 35.10}
        ],
        "Medium Load": [
            {"cpu": 53, "gpu": 73.23, "gpuMemory": 52.38, "memory": 57.61, "disk": 54, "network": 52.30},
            {"cpu": 57, "gpu": 69.12, "gpuMemory": 54.89, "memory": 56.77, "disk": 53, "network": 53.26},
            {"cpu": 55, "gpu": 73.22, "gpuMemory": 53.33, "memory": 57.45, "disk": 55, "network": 55.34},
            {"cpu": 57, "gpu": 75.10, "gpuMemory": 55.71, "memory": 52.30, "disk": 56, "network": 55.61},
            {"cpu": 57, "gpu": 73.07, "gpuMemory": 52.25, "memory": 52.33, "disk": 53, "network": 51.73},
            {"cpu": 53, "gpu": 69.65, "gpuMemory": 52.47, "memory": 57.20, "disk": 52, "network": 52.52},
            {"cpu": 54, "gpu": 71.74, "gpuMemory": 55.19, "memory": 51.86, "disk": 52, "network": 53.38},
            {"cpu": 57, "gpu": 71.89, "gpuMemory": 57.44, "memory": 52.79, "disk": 53, "network": 55.10},
            {"cpu": 54, "gpu": 66.44, "gpuMemory": 51.21, "memory": 54.10, "disk": 53, "network": 53.78},
            {"cpu": 56, "gpu": 75.42, "gpuMemory": 56.38, "memory": 52.50, "disk": 51, "network": 54.34}
        ],
        "High Load": [
            {"cpu": 70, "gpu": 83.27, "gpuMemory": 80.51, "memory": 79.69, "disk": 79, "network": 73.89},
            {"cpu": 75, "gpu": 86.12, "gpuMemory": 81.11, "memory": 77.58, "disk": 76, "network": 76.77},
            {"cpu": 73, "gpu": 85.57, "gpuMemory": 80.36, "memory": 78.32, "disk": 78, "network": 75.72},
            {"cpu": 77, "gpu": 86.56, "gpuMemory": 83.27, "memory": 82.20, "disk": 75, "network": 80.43},
            {"cpu": 70, "gpu": 85.24, "gpuMemory": 78.17, "memory": 81.72, "disk": 74, "network": 79.50},
            {"cpu": 69, "gpu": 82.21, "gpuMemory": 78.55, "memory": 79.45, "disk": 75, "network": 74.70},
            {"cpu": 77, "gpu": 81.95, "gpuMemory": 79.12, "memory": 81.57, "disk": 77, "network": 80.11},
            {"cpu": 70, "gpu": 85.34, "gpuMemory": 79.54, "memory": 78.22, "disk": 78, "network": 76.87},
            {"cpu": 71, "gpu": 81.11, "gpuMemory": 81.54, "memory": 79.28, "disk": 77, "network": 77.34},
            {"cpu": 70, "gpu": 86.52, "gpuMemory": 83.66, "memory": 80.75, "disk": 78, "network": 80.42}
        ]
    },
    "rack_9": {
        "name": "Rack 9",
        "Low Load": [
            {"cpu": 29, "gpu": 41.71, "gpuMemory": 32.22, "memory": 43.43, "disk": 32, "network": 32.22},
            {"cpu": 35, "gpu": 40.82, "gpuMemory": 31.50, "memory": 42.41, "disk": 32, "network": 31.50},
            {"cpu": 33, "gpu": 36.18, "gpuMemory": 29.90, "memory": 41.02, "disk": 30, "network": 29.90},
            {"cpu": 35, "gpu": 36.65, "gpuMemory": 33.59, "memory": 43.24, "disk": 34, "network": 33.59},
            {"cpu": 30, "gpu": 36.85, "gpuMemory": 32.46, "memory": 41.52, "disk": 32, "network": 32.46},
            {"cpu": 34, "gpu": 42.90, "gpuMemory": 33.37, "memory": 40.41, "disk": 33, "network": 33.37},
            {"cpu": 33, "gpu": 41.40, "gpuMemory": 29.27, "memory": 39.04, "disk": 29, "network": 29.27},
            {"cpu": 33, "gpu": 41.23, "gpuMemory": 33.66, "memory": 42.55, "disk": 34, "network": 33.66},
            {"cpu": 31, "gpu": 36.88, "gpuMemory": 32.86, "memory": 41.42, "disk": 33, "network": 32.86},
            {"cpu": 31, "gpu": 41.59, "gpuMemory": 32.11, "memory": 43.54, "disk": 32, "network": 32.11}
        ],
        "Medium Load": [
            {"cpu": 55, "gpu": 69.12, "gpuMemory": 50.81, "memory": 55.88, "disk": 52, "network": 50.73},
            {"cpu": 53, "gpu": 73.22, "gpuMemory": 53.24, "memory": 55.07, "disk": 52, "network": 51.66},
            {"cpu": 56, "gpu": 75.10, "gpuMemory": 51.73, "memory": 55.73, "disk": 54, "network": 53.68},
            {"cpu": 56, "gpu": 73.07, "gpuMemory": 54.04, "memory": 50.73, "disk": 55, "network": 53.94},
            {"cpu": 52, "gpu": 69.65, "gpuMemory": 50.68, "memory": 50.76, "disk": 52, "network": 50.18},
            {"cpu": 52, "gpu": 71.74, "gpuMemory": 50.90, "memory": 55.48, "disk": 50, "network": 50.94},
            {"cpu": 56, "gpu": 71.89, "gpuMemory": 53.53, "memory": 50.30, "disk": 52, "network": 51.78},
            {"cpu": 53, "gpu": 66.44, "gpuMemory": 55.72, "memory": 51.21, "disk": 51, "network": 53.45},
            {"cpu": 55, "gpu": 75.42, "gpuMemory": 49.67, "memory": 52.48, "disk": 51, "network": 52.17},
            {"cpu": 56, "gpu": 66.44, "gpuMemory": 54.69, "memory": 50.93, "disk": 50, "network": 52.71}
        ],
        "High Load": [
            {"cpu": 73, "gpu": 83.27, "gpuMemory": 82.93, "memory": 82.08, "disk": 82, "network": 76.11},
            {"cpu": 78, "gpu": 86.12, "gpuMemory": 83.54, "memory": 79.01, "disk": 78, "network": 79.07},
            {"cpu": 75, "gpu": 85.57, "gpuMemory": 82.77, "memory": 80.67, "disk": 80, "network": 77.99},
            {"cpu": 79, "gpu": 86.56, "gpuMemory": 85.77, "memory": 84.67, "disk": 77, "network": 82.84},
            {"cpu": 73, "gpu": 85.24, "gpuMemory": 80.52, "memory": 84.17, "disk": 76, "network": 81.89},
            {"cpu": 71, "gpu": 82.21, "gpuMemory": 80.91, "memory": 81.83, "disk": 77, "network": 76.94},
            {"cpu": 72, "gpu": 81.95, "gpuMemory": 81.40, "memory": 84.02, "disk": 79, "network": 82.51},
            {"cpu": 72, "gpu": 85.34, "gpuMemory": 81.93, "memory": 80.57, "disk": 80, "network": 79.18},
            {"cpu": 73, "gpu": 81.11, "gpuMemory": 83.99, "memory": 81.66, "disk": 80, "network": 79.66},
            {"cpu": 72, "gpu": 86.52, "gpuMemory": 86.17, "memory": 83.17, "disk": 81, "network": 79.66}
        ]
    }
}


# ==========================================
# 2. COMPUTING EFFICIENCY (Racks 1 to 9)
# Format for each rack:
# "Low Load": [ { "cpu": ..., "power": ..., "inletTemp": ..., "outletTemp": ..., "coolantFlow": ..., "computingEff": ... }, (10 items) ]
# ==========================================

comp_efficiency = {
    "rack_1": {
        "name": "Rack 1",
        "Low Load": [
            {"cpu": 22.33, "power": 57.14, "inletTemp": 45.78, "outletTemp": 57.86, "coolantFlow": 63.38, "computingEff": 87.45},
            {"cpu": 21.26, "power": 60.28, "inletTemp": 44.88, "outletTemp": 57.10, "coolantFlow": 61.73, "computingEff": 86.25},
            {"cpu": 22.12, "power": 58.14, "inletTemp": 44.93, "outletTemp": 56.83, "coolantFlow": 60.29, "computingEff": 87.27},
            {"cpu": 20.77, "power": 57.26, "inletTemp": 45.67, "outletTemp": 57.64, "coolantFlow": 61.93, "computingEff": 85.83},
            {"cpu": 23.61, "power": 58.38, "inletTemp": 44.75, "outletTemp": 57.69, "coolantFlow": 63.47, "computingEff": 86.80},
            {"cpu": 21.42, "power": 62.41, "inletTemp": 44.84, "outletTemp": 56.91, "coolantFlow": 62.39, "computingEff": 88.25},
            {"cpu": 22.65, "power": 62.81, "inletTemp": 45.00, "outletTemp": 58.50, "coolantFlow": 62.01, "computingEff": 88.44},
            {"cpu": 20.21, "power": 61.77, "inletTemp": 44.17, "outletTemp": 58.28, "coolantFlow": 62.08, "computingEff": 86.38},
            {"cpu": 23.28, "power": 60.24, "inletTemp": 45.18, "outletTemp": 57.10, "coolantFlow": 64.28, "computingEff": 87.43},
            {"cpu": 23.44, "power": 56.99, "inletTemp": 44.54, "outletTemp": 58.08, "coolantFlow": 68.00, "computingEff": 87.10}
        ],
        "Medium Load": [
            {"cpu": 49.46, "power": 91.07, "inletTemp": 45.60, "outletTemp": 59.16, "coolantFlow": 76.82, "computingEff": 90.34},
            {"cpu": 48.20, "power": 96.15, "inletTemp": 44.75, "outletTemp": 59.12, "coolantFlow": 76.97, "computingEff": 88.83},
            {"cpu": 48.69, "power": 96.59, "inletTemp": 44.42, "outletTemp": 58.67, "coolantFlow": 77.20, "computingEff": 91.88},
            {"cpu": 48.67, "power": 91.88, "inletTemp": 44.11, "outletTemp": 59.24, "coolantFlow": 77.49, "computingEff": 92.60},
            {"cpu": 48.31, "power": 91.71, "inletTemp": 44.68, "outletTemp": 58.79, "coolantFlow": 73.29, "computingEff": 87.33},
            {"cpu": 49.14, "power": 90.18, "inletTemp": 45.12, "outletTemp": 59.49, "coolantFlow": 74.27, "computingEff": 90.39},
            {"cpu": 51.36, "power": 90.45, "inletTemp": 44.90, "outletTemp": 59.10, "coolantFlow": 76.43, "computingEff": 87.25},
            {"cpu": 50.22, "power": 95.00, "inletTemp": 45.58, "outletTemp": 58.23, "coolantFlow": 75.03, "computingEff": 90.12},
            {"cpu": 50.54, "power": 94.07, "inletTemp": 45.14, "outletTemp": 58.54, "coolantFlow": 75.99, "computingEff": 86.34},
            {"cpu": 48.24, "power": 96.85, "inletTemp": 44.07, "outletTemp": 58.03, "coolantFlow": 68.00, "computingEff": 88.79}
        ],
        "High Load": [
            {"cpu": 60.54, "power": 125.73, "inletTemp": 44.66, "outletTemp": 59.54, "coolantFlow": 85.06, "computingEff": 87.15},
            {"cpu": 61.59, "power": 126.44, "inletTemp": 44.53, "outletTemp": 60.25, "coolantFlow": 85.27, "computingEff": 81.61},
            {"cpu": 60.53, "power": 121.96, "inletTemp": 45.78, "outletTemp": 58.11, "coolantFlow": 83.52, "computingEff": 83.49},
            {"cpu": 65.55, "power": 126.68, "inletTemp": 44.65, "outletTemp": 59.73, "coolantFlow": 85.89, "computingEff": 83.11},
            {"cpu": 60.54, "power": 125.63, "inletTemp": 44.74, "outletTemp": 60.08, "coolantFlow": 83.73, "computingEff": 84.60},
            {"cpu": 66.78, "power": 121.88, "inletTemp": 44.76, "outletTemp": 57.71, "coolantFlow": 84.83, "computingEff": 86.11},
            {"cpu": 64.28, "power": 122.81, "inletTemp": 44.63, "outletTemp": 58.87, "coolantFlow": 83.40, "computingEff": 85.12},
            {"cpu": 61.76, "power": 119.95, "inletTemp": 45.68, "outletTemp": 57.78, "coolantFlow": 85.39, "computingEff": 84.39},
            {"cpu": 61.63, "power": 124.66, "inletTemp": 44.86, "outletTemp": 58.11, "coolantFlow": 83.68, "computingEff": 83.53},
            {"cpu": 60.20, "power": 125.89, "inletTemp": 45.72, "outletTemp": 60.04, "coolantFlow": 68.00, "computingEff": 84.51}
        ]
    },
    "rack_2": {
        "name": "Rack 2",
        "Low Load": [
            {"cpu": 26.61, "power": 60.01, "inletTemp": 44.68, "outletTemp": 57.57, "coolantFlow": 60.20, "computingEff": 88.17},
            {"cpu": 26.69, "power": 64.12, "inletTemp": 44.17, "outletTemp": 57.20, "coolantFlow": 61.58, "computingEff": 86.46},
            {"cpu": 22.68, "power": 64.08, "inletTemp": 44.22, "outletTemp": 57.22, "coolantFlow": 63.63, "computingEff": 87.55},
            {"cpu": 23.61, "power": 64.91, "inletTemp": 44.49, "outletTemp": 57.22, "coolantFlow": 64.01, "computingEff": 86.68},
            {"cpu": 26.87, "power": 67.59, "inletTemp": 45.92, "outletTemp": 55.00, "coolantFlow": 60.70, "computingEff": 88.69},
            {"cpu": 25.35, "power": 66.29, "inletTemp": 44.82, "outletTemp": 57.67, "coolantFlow": 63.50, "computingEff": 88.39},
            {"cpu": 22.30, "power": 64.14, "inletTemp": 44.08, "outletTemp": 57.03, "coolantFlow": 63.91, "computingEff": 88.67},
            {"cpu": 22.46, "power": 61.95, "inletTemp": 44.08, "outletTemp": 57.91, "coolantFlow": 68.00, "computingEff": 86.85},
            {"cpu": 26.47, "power": 67.44, "inletTemp": 44.63, "outletTemp": 58.43, "coolantFlow": 60.55, "computingEff": 85.84},
            {"cpu": 26.61, "power": 62.78, "inletTemp": 44.63, "outletTemp": 58.04, "coolantFlow": 60.02, "computingEff": 86.56}
        ],
        "Medium Load": [
            {"cpu": 49.86, "power": 97.06, "inletTemp": 44.84, "outletTemp": 58.87, "coolantFlow": 77.07, "computingEff": 87.86},
            {"cpu": 49.67, "power": 97.45, "inletTemp": 44.25, "outletTemp": 58.25, "coolantFlow": 76.01, "computingEff": 90.87},
            {"cpu": 51.67, "power": 96.57, "inletTemp": 44.66, "outletTemp": 58.71, "coolantFlow": 76.56, "computingEff": 88.86},
            {"cpu": 49.55, "power": 97.36, "inletTemp": 44.53, "outletTemp": 58.69, "coolantFlow": 75.23, "computingEff": 90.63},
            {"cpu": 51.34, "power": 98.11, "inletTemp": 45.08, "outletTemp": 58.09, "coolantFlow": 73.84, "computingEff": 89.79},
            {"cpu": 49.46, "power": 102.70, "inletTemp": 44.62, "outletTemp": 59.00, "coolantFlow": 77.39, "computingEff": 88.37},
            {"cpu": 50.68, "power": 103.55, "inletTemp": 44.97, "outletTemp": 59.64, "coolantFlow": 73.24, "computingEff": 88.21},
            {"cpu": 48.57, "power": 100.96, "inletTemp": 44.64, "outletTemp": 58.38, "coolantFlow": 73.99, "computingEff": 90.60},
            {"cpu": 48.65, "power": 98.21, "inletTemp": 44.07, "outletTemp": 59.20, "coolantFlow": 73.43, "computingEff": 89.71},
            {"cpu": 48.89, "power": 98.57, "inletTemp": 44.90, "outletTemp": 58.89, "coolantFlow": 68.00, "computingEff": 87.32}
        ],
        "High Load": [
            {"cpu": 62.44, "power": 130.05, "inletTemp": 45.78, "outletTemp": 58.15, "coolantFlow": 85.79, "computingEff": 85.87},
            {"cpu": 61.72, "power": 129.52, "inletTemp": 44.38, "outletTemp": 57.80, "coolantFlow": 85.92, "computingEff": 84.45},
            {"cpu": 59.47, "power": 133.52, "inletTemp": 45.11, "outletTemp": 57.89, "coolantFlow": 83.27, "computingEff": 85.80},
            {"cpu": 64.87, "power": 130.50, "inletTemp": 45.74, "outletTemp": 58.06, "coolantFlow": 84.69, "computingEff": 86.80},
            {"cpu": 66.10, "power": 132.43, "inletTemp": 45.60, "outletTemp": 59.56, "coolantFlow": 83.70, "computingEff": 82.15},
            {"cpu": 63.47, "power": 131.09, "inletTemp": 44.36, "outletTemp": 58.71, "coolantFlow": 84.79, "computingEff": 84.11},
            {"cpu": 61.25, "power": 130.65, "inletTemp": 45.59, "outletTemp": 60.62, "coolantFlow": 85.31, "computingEff": 82.69},
            {"cpu": 60.88, "power": 131.07, "inletTemp": 45.68, "outletTemp": 58.23, "coolantFlow": 85.47, "computingEff": 82.30},
            {"cpu": 66.86, "power": 127.94, "inletTemp": 44.43, "outletTemp": 60.71, "coolantFlow": 83.67, "computingEff": 81.66},
            {"cpu": 59.44, "power": 135.86, "inletTemp": 44.41, "outletTemp": 59.56, "coolantFlow": 68.00, "computingEff": 82.53}
        ]
    },
    "rack_3": {
        "name": "Rack 3",
        "Low Load": [
            {"cpu": 30.71, "power": 82.42, "inletTemp": 44.72, "outletTemp": 60.39, "coolantFlow": 65.84, "computingEff": 94.85},
            {"cpu": 33.67, "power": 78.04, "inletTemp": 45.35, "outletTemp": 55.00, "coolantFlow": 68.00, "computingEff": 91.63},
            {"cpu": 34.58, "power": 81.27, "inletTemp": 45.83, "outletTemp": 59.56, "coolantFlow": 65.01, "computingEff": 92.30},
            {"cpu": 35.46, "power": 83.47, "inletTemp": 45.60, "outletTemp": 59.98, "coolantFlow": 62.09, "computingEff": 94.13},
            {"cpu": 30.28, "power": 80.18, "inletTemp": 44.22, "outletTemp": 59.95, "coolantFlow": 65.21, "computingEff": 88.68},
            {"cpu": 34.31, "power": 79.93, "inletTemp": 44.24, "outletTemp": 60.69, "coolantFlow": 65.70, "computingEff": 88.20},
            {"cpu": 32.68, "power": 80.59, "inletTemp": 45.42, "outletTemp": 59.88, "coolantFlow": 62.03, "computingEff": 89.15},
            {"cpu": 34.62, "power": 81.04, "inletTemp": 44.82, "outletTemp": 59.90, "coolantFlow": 67.20, "computingEff": 91.69},
            {"cpu": 34.71, "power": 78.16, "inletTemp": 44.75, "outletTemp": 60.74, "coolantFlow": 63.86, "computingEff": 92.12},
            {"cpu": 35.52, "power": 83.60, "inletTemp": 45.28, "outletTemp": 61.08, "coolantFlow": 68.00, "computingEff": 88.14}
        ],
        "Medium Load": [
            {"cpu": 57.77, "power": 129.71, "inletTemp": 45.56, "outletTemp": 61.60, "coolantFlow": 76.57, "computingEff": 84.35},
            {"cpu": 55.80, "power": 128.21, "inletTemp": 44.29, "outletTemp": 61.68, "coolantFlow": 79.16, "computingEff": 85.69},
            {"cpu": 53.64, "power": 135.07, "inletTemp": 45.54, "outletTemp": 61.00, "coolantFlow": 74.90, "computingEff": 81.50},
            {"cpu": 53.30, "power": 125.37, "inletTemp": 45.51, "outletTemp": 61.25, "coolantFlow": 77.01, "computingEff": 84.85},
            {"cpu": 54.12, "power": 135.16, "inletTemp": 45.38, "outletTemp": 60.98, "coolantFlow": 78.13, "computingEff": 82.13},
            {"cpu": 56.57, "power": 125.33, "inletTemp": 44.77, "outletTemp": 60.15, "coolantFlow": 80.44, "computingEff": 84.78},
            {"cpu": 58.70, "power": 125.76, "inletTemp": 44.73, "outletTemp": 61.02, "coolantFlow": 75.20, "computingEff": 83.11},
            {"cpu": 57.85, "power": 132.36, "inletTemp": 45.03, "outletTemp": 60.90, "coolantFlow": 80.22, "computingEff": 84.32},
            {"cpu": 53.49, "power": 130.21, "inletTemp": 45.54, "outletTemp": 60.88, "coolantFlow": 74.85, "computingEff": 83.73},
            {"cpu": 55.89, "power": 127.76, "inletTemp": 45.67, "outletTemp": 61.25, "coolantFlow": 68.00, "computingEff": 82.60}
        ],
        "High Load": [
            {"cpu": 75.79, "power": 172.91, "inletTemp": 45.32, "outletTemp": 62.03, "coolantFlow": 88.64, "computingEff": 82.30},
            {"cpu": 74.54, "power": 175.13, "inletTemp": 44.41, "outletTemp": 61.73, "coolantFlow": 90.05, "computingEff": 80.13},
            {"cpu": 71.52, "power": 168.43, "inletTemp": 44.68, "outletTemp": 62.03, "coolantFlow": 86.93, "computingEff": 84.62},
            {"cpu": 73.90, "power": 167.34, "inletTemp": 44.66, "outletTemp": 62.49, "coolantFlow": 85.74, "computingEff": 82.38},
            {"cpu": 73.20, "power": 176.11, "inletTemp": 45.35, "outletTemp": 62.12, "coolantFlow": 89.77, "computingEff": 82.84},
            {"cpu": 68.84, "power": 175.04, "inletTemp": 44.84, "outletTemp": 62.34, "coolantFlow": 88.47, "computingEff": 80.24},
            {"cpu": 76.84, "power": 171.84, "inletTemp": 44.97, "outletTemp": 62.49, "coolantFlow": 87.10, "computingEff": 81.71},
            {"cpu": 74.76, "power": 168.30, "inletTemp": 44.32, "outletTemp": 62.14, "coolantFlow": 84.86, "computingEff": 83.14},
            {"cpu": 73.86, "power": 171.50, "inletTemp": 45.70, "outletTemp": 62.88, "coolantFlow": 87.58, "computingEff": 83.17},
            {"cpu": 75.59, "power": 168.73, "inletTemp": 44.49, "outletTemp": 62.08, "coolantFlow": 68.00, "computingEff": 81.62}
        ]
    },
    "rack_4": {
        "name": "Rack 4",
        "Low Load": [
            {"cpu": 74.39, "power": 164.80, "inletTemp": 51.83, "outletTemp": 77.76, "coolantFlow": 86.48, "computingEff": 76.82},
            {"cpu": 75.15, "power": 165.12, "inletTemp": 51.02, "outletTemp": 76.58, "coolantFlow": 85.61, "computingEff": 81.66},
            {"cpu": 75.68, "power": 169.77, "inletTemp": 52.13, "outletTemp": 77.36, "coolantFlow": 68.00, "computingEff": 81.36},
            {"cpu": 75.78, "power": 170.73, "inletTemp": 52.82, "outletTemp": 55.00, "coolantFlow": 89.04, "computingEff": 79.47},
            {"cpu": 76.10, "power": 162.51, "inletTemp": 52.45, "outletTemp": 77.88, "coolantFlow": 88.61, "computingEff": 80.61},
            {"cpu": 79.77, "power": 162.12, "inletTemp": 51.35, "outletTemp": 77.04, "coolantFlow": 88.44, "computingEff": 82.81},
            {"cpu": 77.33, "power": 164.69, "inletTemp": 51.85, "outletTemp": 76.97, "coolantFlow": 86.68, "computingEff": 80.90},
            {"cpu": 79.88, "power": 171.77, "inletTemp": 51.14, "outletTemp": 78.30, "coolantFlow": 89.22, "computingEff": 82.39},
            {"cpu": 74.40, "power": 171.63, "inletTemp": 51.69, "outletTemp": 76.65, "coolantFlow": 88.34, "computingEff": 81.13},
            {"cpu": 78.47, "power": 162.78, "inletTemp": 52.52, "outletTemp": 76.95, "coolantFlow": 86.60, "computingEff": 81.24}
        ],
        "Medium Load": [
            {"cpu": 77.80, "power": 162.96, "inletTemp": 48.80, "outletTemp": 65.21, "coolantFlow": 85.71, "computingEff": 84.83},
            {"cpu": 78.88, "power": 161.99, "inletTemp": 49.34, "outletTemp": 65.50, "coolantFlow": 84.99, "computingEff": 78.44},
            {"cpu": 78.45, "power": 164.51, "inletTemp": 49.78, "outletTemp": 65.44, "coolantFlow": 85.95, "computingEff": 79.57},
            {"cpu": 73.85, "power": 166.30, "inletTemp": 49.47, "outletTemp": 65.79, "coolantFlow": 89.12, "computingEff": 79.40},
            {"cpu": 78.58, "power": 169.59, "inletTemp": 49.63, "outletTemp": 64.57, "coolantFlow": 86.65, "computingEff": 80.64},
            {"cpu": 74.20, "power": 172.11, "inletTemp": 49.56, "outletTemp": 65.40, "coolantFlow": 85.44, "computingEff": 80.19},
            {"cpu": 76.56, "power": 171.84, "inletTemp": 48.38, "outletTemp": 65.87, "coolantFlow": 88.01, "computingEff": 81.57},
            {"cpu": 79.41, "power": 164.64, "inletTemp": 48.97, "outletTemp": 65.56, "coolantFlow": 85.79, "computingEff": 79.72},
            {"cpu": 77.23, "power": 169.55, "inletTemp": 49.34, "outletTemp": 65.58, "coolantFlow": 84.98, "computingEff": 79.48},
            {"cpu": 75.38, "power": 171.02, "inletTemp": 49.47, "outletTemp": 64.35, "coolantFlow": 68.00, "computingEff": 77.11}
        ],
        "High Load": [
            {"cpu": 92.47, "power": 185.39, "inletTemp": 45.57, "outletTemp": 64.16, "coolantFlow": 94.75, "computingEff": 80.54},
            {"cpu": 79.31, "power": 187.18, "inletTemp": 45.45, "outletTemp": 64.29, "coolantFlow": 95.78, "computingEff": 78.89},
            {"cpu": 84.67, "power": 178.69, "inletTemp": 45.78, "outletTemp": 64.31, "coolantFlow": 99.86, "computingEff": 77.52},
            {"cpu": 89.20, "power": 189.48, "inletTemp": 44.49, "outletTemp": 67.43, "coolantFlow": 94.64, "computingEff": 78.89},
            {"cpu": 87.65, "power": 182.14, "inletTemp": 45.60, "outletTemp": 68.24, "coolantFlow": 99.81, "computingEff": 80.68},
            {"cpu": 79.65, "power": 185.41, "inletTemp": 45.82, "outletTemp": 67.04, "coolantFlow": 98.02, "computingEff": 78.34},
            {"cpu": 88.53, "power": 189.59, "inletTemp": 45.03, "outletTemp": 65.31, "coolantFlow": 100.65, "computingEff": 80.76},
            {"cpu": 88.50, "power": 180.40, "inletTemp": 45.74, "outletTemp": 63.96, "coolantFlow": 99.67, "computingEff": 77.32},
            {"cpu": 85.72, "power": 178.67, "inletTemp": 45.22, "outletTemp": 68.33, "coolantFlow": 96.58, "computingEff": 81.86},
            {"cpu": 79.42, "power": 181.35, "inletTemp": 44.91, "outletTemp": 65.31, "coolantFlow": 68.00, "computingEff": 80.27}
        ]
    },
    "rack_5": {
        "name": "Rack 5",
        "Low Load": [
            {"cpu": 35.10, "power": 66.16, "inletTemp": 44.54, "outletTemp": 60.27, "coolantFlow": 62.17, "computingEff": 90.11},
            {"cpu": 34.15, "power": 63.93, "inletTemp": 45.88, "outletTemp": 60.59, "coolantFlow": 61.50, "computingEff": 93.51},
            {"cpu": 31.73, "power": 67.43, "inletTemp": 44.33, "outletTemp": 60.02, "coolantFlow": 67.43, "computingEff": 91.65},
            {"cpu": 34.14, "power": 64.09, "inletTemp": 44.82, "outletTemp": 60.25, "coolantFlow": 63.58, "computingEff": 93.12},
            {"cpu": 30.35, "power": 63.28, "inletTemp": 44.45, "outletTemp": 60.22, "coolantFlow": 65.14, "computingEff": 91.23},
            {"cpu": 34.84, "power": 65.22, "inletTemp": 44.84, "outletTemp": 60.98, "coolantFlow": 64.41, "computingEff": 92.31},
            {"cpu": 35.87, "power": 65.70, "inletTemp": 45.00, "outletTemp": 60.76, "coolantFlow": 68.00, "computingEff": 90.36},
            {"cpu": 31.10, "power": 66.71, "inletTemp": 44.52, "outletTemp": 59.51, "coolantFlow": 64.16, "computingEff": 90.66},
            {"cpu": 31.30, "power": 64.33, "inletTemp": 45.00, "outletTemp": 55.00, "coolantFlow": 67.43, "computingEff": 94.54},
            {"cpu": 31.13, "power": 65.49, "inletTemp": 44.88, "outletTemp": 60.39, "coolantFlow": 67.61, "computingEff": 93.46}
        ],
        "Medium Load": [
            {"cpu": 57.16, "power": 107.91, "inletTemp": 44.42, "outletTemp": 61.23, "coolantFlow": 75.70, "computingEff": 84.48},
            {"cpu": 54.87, "power": 103.06, "inletTemp": 44.46, "outletTemp": 61.39, "coolantFlow": 79.38, "computingEff": 85.27},
            {"cpu": 58.48, "power": 101.66, "inletTemp": 44.11, "outletTemp": 61.60, "coolantFlow": 74.82, "computingEff": 83.17},
            {"cpu": 58.73, "power": 105.63, "inletTemp": 44.18, "outletTemp": 60.94, "coolantFlow": 77.64, "computingEff": 85.20},
            {"cpu": 52.14, "power": 107.32, "inletTemp": 45.16, "outletTemp": 61.04, "coolantFlow": 77.39, "computingEff": 83.10},
            {"cpu": 55.78, "power": 108.39, "inletTemp": 44.88, "outletTemp": 61.08, "coolantFlow": 75.83, "computingEff": 83.10},
            {"cpu": 52.42, "power": 103.69, "inletTemp": 45.65, "outletTemp": 61.56, "coolantFlow": 78.23, "computingEff": 83.88},
            {"cpu": 55.37, "power": 104.74, "inletTemp": 45.32, "outletTemp": 60.11, "coolantFlow": 79.97, "computingEff": 82.59},
            {"cpu": 52.75, "power": 110.18, "inletTemp": 44.20, "outletTemp": 60.50, "coolantFlow": 76.77, "computingEff": 81.89},
            {"cpu": 56.56, "power": 103.75, "inletTemp": 44.64, "outletTemp": 60.73, "coolantFlow": 68.00, "computingEff": 84.28}
        ],
        "High Load": [
            {"cpu": 76.31, "power": 137.13, "inletTemp": 44.34, "outletTemp": 61.81, "coolantFlow": 89.70, "computingEff": 82.59},
            {"cpu": 68.48, "power": 143.49, "inletTemp": 44.78, "outletTemp": 61.71, "coolantFlow": 88.92, "computingEff": 80.10},
            {"cpu": 73.88, "power": 137.30, "inletTemp": 44.55, "outletTemp": 61.73, "coolantFlow": 87.00, "computingEff": 82.67},
            {"cpu": 75.48, "power": 141.35, "inletTemp": 44.45, "outletTemp": 62.53, "coolantFlow": 84.93, "computingEff": 83.19},
            {"cpu": 77.59, "power": 135.99, "inletTemp": 44.65, "outletTemp": 62.10, "coolantFlow": 88.56, "computingEff": 81.73},
            {"cpu": 67.54, "power": 134.84, "inletTemp": 45.45, "outletTemp": 61.71, "coolantFlow": 88.46, "computingEff": 83.71},
            {"cpu": 67.37, "power": 137.06, "inletTemp": 45.82, "outletTemp": 61.42, "coolantFlow": 87.99, "computingEff": 82.57},
            {"cpu": 76.34, "power": 136.21, "inletTemp": 45.43, "outletTemp": 61.81, "coolantFlow": 86.50, "computingEff": 83.81},
            {"cpu": 68.57, "power": 142.22, "inletTemp": 45.74, "outletTemp": 61.66, "coolantFlow": 90.49, "computingEff": 81.34},
            {"cpu": 74.50, "power": 134.95, "inletTemp": 44.70, "outletTemp": 62.36, "coolantFlow": 68.00, "computingEff": 83.82}
        ]
    },
    "rack_6": {
        "name": "Rack 6",
        "Low Load": [
            {"cpu": 32.32, "power": 63.87, "inletTemp": 44.31, "outletTemp": 24.58, "coolantFlow": 63.28, "computingEff": 92.45},
            {"cpu": 31.88, "power": 67.26, "inletTemp": 44.28, "outletTemp": 24.39, "coolantFlow": 61.69, "computingEff": 93.30},
            {"cpu": 30.74, "power": 65.18, "inletTemp": 45.00, "outletTemp": 24.88, "coolantFlow": 64.43, "computingEff": 94.73},
            {"cpu": 31.74, "power": 63.19, "inletTemp": 45.05, "outletTemp": 24.42, "coolantFlow": 65.52, "computingEff": 89.53},
            {"cpu": 34.72, "power": 67.30, "inletTemp": 45.69, "outletTemp": 24.64, "coolantFlow": 64.79, "computingEff": 92.58},
            {"cpu": 33.31, "power": 67.28, "inletTemp": 45.90, "outletTemp": 24.36, "coolantFlow": 66.48, "computingEff": 93.79},
            {"cpu": 30.34, "power": 65.62, "inletTemp": 45.35, "outletTemp": 24.18, "coolantFlow": 68.00, "computingEff": 91.57},
            {"cpu": 33.81, "power": 65.05, "inletTemp": 44.28, "outletTemp": 24.89, "coolantFlow": 67.34, "computingEff": 91.28},
            {"cpu": 34.77, "power": 65.60, "inletTemp": 45.53, "outletTemp": 24.54, "coolantFlow": 65.27, "computingEff": 93.21},
            {"cpu": 35.79, "power": 64.35, "inletTemp": 44.19, "outletTemp": 24.62, "coolantFlow": 63.93, "computingEff": 90.34}
        ],
        "Medium Load": [
            {"cpu": 54.21, "power": 105.35, "inletTemp": 44.22, "outletTemp": 60.34, "coolantFlow": 77.65, "computingEff": 82.69},
            {"cpu": 52.81, "power": 110.00, "inletTemp": 45.05, "outletTemp": 61.08, "coolantFlow": 74.92, "computingEff": 83.21},
            {"cpu": 57.54, "power": 103.01, "inletTemp": 44.27, "outletTemp": 60.38, "coolantFlow": 80.35, "computingEff": 84.90},
            {"cpu": 54.67, "power": 103.78, "inletTemp": 44.35, "outletTemp": 60.57, "coolantFlow": 78.28, "computingEff": 83.64},
            {"cpu": 58.40, "power": 110.11, "inletTemp": 45.69, "outletTemp": 60.81, "coolantFlow": 75.40, "computingEff": 85.45},
            {"cpu": 53.47, "power": 104.87, "inletTemp": 44.97, "outletTemp": 61.50, "coolantFlow": 75.60, "computingEff": 83.42},
            {"cpu": 55.14, "power": 104.34, "inletTemp": 44.90, "outletTemp": 61.45, "coolantFlow": 80.70, "computingEff": 84.29},
            {"cpu": 54.62, "power": 102.09, "inletTemp": 44.81, "outletTemp": 61.31, "coolantFlow": 75.63, "computingEff": 83.16},
            {"cpu": 56.17, "power": 109.00, "inletTemp": 45.03, "outletTemp": 61.10, "coolantFlow": 80.29, "computingEff": 84.41},
            {"cpu": 57.63, "power": 108.32, "inletTemp": 45.49, "outletTemp": 61.08, "coolantFlow": 68.00, "computingEff": 82.56}
        ],
        "High Load": [
            {"cpu": 72.15, "power": 134.97, "inletTemp": 45.28, "outletTemp": 62.66, "coolantFlow": 89.91, "computingEff": 83.37},
            {"cpu": 72.23, "power": 142.22, "inletTemp": 44.51, "outletTemp": 61.79, "coolantFlow": 89.19, "computingEff": 80.62},
            {"cpu": 69.27, "power": 139.97, "inletTemp": 45.85, "outletTemp": 62.53, "coolantFlow": 85.03, "computingEff": 84.26},
            {"cpu": 76.24, "power": 136.78, "inletTemp": 44.65, "outletTemp": 61.90, "coolantFlow": 85.29, "computingEff": 80.45},
            {"cpu": 68.70, "power": 139.12, "inletTemp": 45.49, "outletTemp": 62.84, "coolantFlow": 85.84, "computingEff": 82.58},
            {"cpu": 67.33, "power": 135.58, "inletTemp": 45.85, "outletTemp": 62.66, "coolantFlow": 90.08, "computingEff": 82.23},
            {"cpu": 75.44, "power": 140.76, "inletTemp": 44.38, "outletTemp": 61.51, "coolantFlow": 88.70, "computingEff": 84.78},
            {"cpu": 71.69, "power": 138.14, "inletTemp": 44.76, "outletTemp": 61.73, "coolantFlow": 89.02, "computingEff": 82.58},
            {"cpu": 67.49, "power": 136.94, "inletTemp": 44.32, "outletTemp": 62.36, "coolantFlow": 88.31, "computingEff": 81.73},
            {"cpu": 77.20, "power": 135.49, "inletTemp": 44.63, "outletTemp": 61.69, "coolantFlow": 68.00, "computingEff": 81.20}
        ]
    },
    # Exact Rack 7, 8, 9 Computing Efficiency data from user's spreadsheet
    "rack_7": {
        "name": "Rack 7",
        "Low Load": [
            {"cpu": 44.17, "power": 75.12, "inletTemp": 46.87, "outletTemp": 60.58, "coolantFlow": 72.45, "computingEff": 90.74},
            {"cpu": 45.66, "power": 70.90, "inletTemp": 44.12, "outletTemp": 61.77, "coolantFlow": 72.20, "computingEff": 95.84},
            {"cpu": 46.64, "power": 71.60, "inletTemp": 46.94, "outletTemp": 55.00, "coolantFlow": 75.48, "computingEff": 93.26},
            {"cpu": 49.69, "power": 72.32, "inletTemp": 46.45, "outletTemp": 59.90, "coolantFlow": 68.00, "computingEff": 93.28},
            {"cpu": 44.32, "power": 72.37, "inletTemp": 45.00, "outletTemp": 59.44, "coolantFlow": 75.81, "computingEff": 89.38},
            {"cpu": 44.13, "power": 74.24, "inletTemp": 45.16, "outletTemp": 62.60, "coolantFlow": 68.87, "computingEff": 90.47},
            {"cpu": 48.51, "power": 74.40, "inletTemp": 47.45, "outletTemp": 60.10, "coolantFlow": 72.71, "computingEff": 91.80},
            {"cpu": 47.11, "power": 71.32, "inletTemp": 45.25, "outletTemp": 61.89, "coolantFlow": 70.15, "computingEff": 91.36},
            {"cpu": 49.79, "power": 75.38, "inletTemp": 47.24, "outletTemp": 63.56, "coolantFlow": 71.70, "computingEff": 90.34},
            {"cpu": 47.61, "power": 72.39, "inletTemp": 44.17, "outletTemp": 60.98, "coolantFlow": 75.80, "computingEff": 90.77}
        ],
        "Medium Load": [
            {"cpu": 68.79, "power": 117.19, "inletTemp": 47.40, "outletTemp": 62.86, "coolantFlow": 82.14, "computingEff": 92.69},
            {"cpu": 62.65, "power": 110.04, "inletTemp": 44.49, "outletTemp": 61.25, "coolantFlow": 84.73, "computingEff": 92.57},
            {"cpu": 64.38, "power": 112.19, "inletTemp": 44.25, "outletTemp": 60.42, "coolantFlow": 88.82, "computingEff": 91.20},
            {"cpu": 62.71, "power": 120.92, "inletTemp": 46.54, "outletTemp": 60.71, "coolantFlow": 86.58, "computingEff": 90.31},
            {"cpu": 61.69, "power": 113.85, "inletTemp": 47.59, "outletTemp": 62.26, "coolantFlow": 83.52, "computingEff": 90.68},
            {"cpu": 68.65, "power": 120.90, "inletTemp": 46.56, "outletTemp": 61.74, "coolantFlow": 84.28, "computingEff": 87.32},
            {"cpu": 68.88, "power": 110.13, "inletTemp": 44.81, "outletTemp": 61.00, "coolantFlow": 83.32, "computingEff": 92.58},
            {"cpu": 64.42, "power": 112.93, "inletTemp": 47.07, "outletTemp": 63.44, "coolantFlow": 86.83, "computingEff": 86.81},
            {"cpu": 63.36, "power": 111.90, "inletTemp": 44.92, "outletTemp": 60.55, "coolantFlow": 84.31, "computingEff": 91.34},
            {"cpu": 66.20, "power": 113.36, "inletTemp": 45.49, "outletTemp": 62.76, "coolantFlow": 68.00, "computingEff": 89.25}
        ],
        "High Load": [
            {"cpu": 84.48, "power": 146.06, "inletTemp": 45.57, "outletTemp": 68.32, "coolantFlow": 98.81, "computingEff": 80.10},
            {"cpu": 80.77, "power": 148.01, "inletTemp": 45.35, "outletTemp": 64.62, "coolantFlow": 97.29, "computingEff": 78.61},
            {"cpu": 78.64, "power": 156.99, "inletTemp": 45.85, "outletTemp": 64.55, "coolantFlow": 97.55, "computingEff": 79.89},
            {"cpu": 88.84, "power": 149.12, "inletTemp": 44.95, "outletTemp": 63.77, "coolantFlow": 93.58, "computingEff": 81.51},
            {"cpu": 90.19, "power": 149.17, "inletTemp": 45.14, "outletTemp": 65.85, "coolantFlow": 100.16, "computingEff": 80.63},
            {"cpu": 90.60, "power": 146.70, "inletTemp": 44.76, "outletTemp": 66.41, "coolantFlow": 95.95, "computingEff": 80.81},
            {"cpu": 89.61, "power": 147.05, "inletTemp": 44.51, "outletTemp": 67.35, "coolantFlow": 100.64, "computingEff": 77.28},
            {"cpu": 88.46, "power": 145.52, "inletTemp": 45.47, "outletTemp": 67.72, "coolantFlow": 96.43, "computingEff": 78.51},
            {"cpu": 91.85, "power": 148.51, "inletTemp": 44.72, "outletTemp": 68.06, "coolantFlow": 96.58, "computingEff": 77.83},
            {"cpu": 86.38, "power": 145.12, "inletTemp": 45.76, "outletTemp": 65.61, "coolantFlow": 68.00, "computingEff": 78.87}
        ]
    },
    "rack_8": {
        "name": "Rack 8",
        "Low Load": [
            {"cpu": 30.27, "power": 77.76, "inletTemp": 45.90, "outletTemp": 60.96, "coolantFlow": 65.60, "computingEff": 91.20},
            {"cpu": 35.89, "power": 77.10, "inletTemp": 44.17, "outletTemp": 60.88, "coolantFlow": 62.64, "computingEff": 94.19},
            {"cpu": 33.54, "power": 77.49, "inletTemp": 45.32, "outletTemp": 60.05, "coolantFlow": 67.31, "computingEff": 92.19},
            {"cpu": 35.63, "power": 72.95, "inletTemp": 45.28, "outletTemp": 60.81, "coolantFlow": 64.99, "computingEff": 88.20},
            {"cpu": 30.61, "power": 73.55, "inletTemp": 44.08, "outletTemp": 59.24, "coolantFlow": 62.72, "computingEff": 91.87},
            {"cpu": 34.59, "power": 77.02, "inletTemp": 44.33, "outletTemp": 59.41, "coolantFlow": 68.00, "computingEff": 90.83},
            {"cpu": 33.89, "power": 76.12, "inletTemp": 45.78, "outletTemp": 59.88, "coolantFlow": 62.36, "computingEff": 90.10},
            {"cpu": 33.82, "power": 77.78, "inletTemp": 45.00, "outletTemp": 55.00, "coolantFlow": 66.78, "computingEff": 90.57},
            {"cpu": 31.52, "power": 73.42, "inletTemp": 45.00, "outletTemp": 60.69, "coolantFlow": 61.56, "computingEff": 92.82},
            {"cpu": 31.85, "power": 77.72, "inletTemp": 44.15, "outletTemp": 60.32, "coolantFlow": 67.01, "computingEff": 94.67}
        ],
        "Medium Load": [
            {"cpu": 53.29, "power": 118.39, "inletTemp": 45.38, "outletTemp": 60.92, "coolantFlow": 79.82, "computingEff": 84.56},
            {"cpu": 56.53, "power": 125.13, "inletTemp": 44.95, "outletTemp": 61.12, "coolantFlow": 78.89, "computingEff": 84.12},
            {"cpu": 54.57, "power": 125.16, "inletTemp": 44.68, "outletTemp": 61.10, "coolantFlow": 80.34, "computingEff": 83.20},
            {"cpu": 57.39, "power": 120.79, "inletTemp": 45.19, "outletTemp": 60.86, "coolantFlow": 77.30, "computingEff": 84.29},
            {"cpu": 57.29, "power": 124.67, "inletTemp": 45.51, "outletTemp": 61.37, "coolantFlow": 79.92, "computingEff": 84.66},
            {"cpu": 53.26, "power": 127.01, "inletTemp": 44.68, "outletTemp": 60.67, "coolantFlow": 75.37, "computingEff": 84.83},
            {"cpu": 53.80, "power": 126.52, "inletTemp": 45.60, "outletTemp": 60.59, "coolantFlow": 75.86, "computingEff": 83.30},
            {"cpu": 57.27, "power": 122.22, "inletTemp": 45.60, "outletTemp": 61.37, "coolantFlow": 75.35, "computingEff": 84.65},
            {"cpu": 54.16, "power": 122.67, "inletTemp": 44.90, "outletTemp": 61.23, "coolantFlow": 80.85, "computingEff": 82.31},
            {"cpu": 56.40, "power": 124.03, "inletTemp": 44.90, "outletTemp": 61.68, "coolantFlow": 68.00, "computingEff": 82.40}
        ],
        "High Load": [
            {"cpu": 70.45, "power": 155.80, "inletTemp": 44.86, "outletTemp": 61.66, "coolantFlow": 90.10, "computingEff": 83.60},
            {"cpu": 75.47, "power": 158.55, "inletTemp": 45.60, "outletTemp": 61.62, "coolantFlow": 88.29, "computingEff": 82.87},
            {"cpu": 73.13, "power": 160.46, "inletTemp": 44.91, "outletTemp": 61.97, "coolantFlow": 87.38, "computingEff": 82.33},
            {"cpu": 76.62, "power": 158.29, "inletTemp": 45.07, "outletTemp": 62.31, "coolantFlow": 85.24, "computingEff": 83.86},
            {"cpu": 70.42, "power": 156.40, "inletTemp": 44.61, "outletTemp": 61.73, "coolantFlow": 85.99, "computingEff": 81.47},
            {"cpu": 69.19, "power": 160.74, "inletTemp": 45.45, "outletTemp": 61.53, "coolantFlow": 90.76, "computingEff": 82.50},
            {"cpu": 76.53, "power": 158.01, "inletTemp": 45.49, "outletTemp": 62.47, "coolantFlow": 89.05, "computingEff": 83.74},
            {"cpu": 69.54, "power": 165.36, "inletTemp": 45.62, "outletTemp": 61.56, "coolantFlow": 85.36, "computingEff": 83.72},
            {"cpu": 70.74, "power": 156.33, "inletTemp": 44.91, "outletTemp": 61.47, "coolantFlow": 90.94, "computingEff": 81.29},
            {"cpu": 70.21, "power": 158.23, "inletTemp": 45.62, "outletTemp": 62.71, "coolantFlow": 68.00, "computingEff": 84.73}
        ]
    },
    "rack_9": {
        "name": "Rack 9",
        "Low Load": [
            {"cpu": 29.36, "power": 64.51, "inletTemp": 45.78, "outletTemp": 57.86, "coolantFlow": 63.38, "computingEff": 88.46},
            {"cpu": 34.81, "power": 63.97, "inletTemp": 45.00, "outletTemp": 57.10, "coolantFlow": 61.73, "computingEff": 91.36},
            {"cpu": 32.53, "power": 64.28, "inletTemp": 44.93, "outletTemp": 55.00, "coolantFlow": 60.29, "computingEff": 89.42},
            {"cpu": 34.56, "power": 60.52, "inletTemp": 45.67, "outletTemp": 57.64, "coolantFlow": 61.93, "computingEff": 85.55},
            {"cpu": 29.69, "power": 61.02, "inletTemp": 44.75, "outletTemp": 57.69, "coolantFlow": 63.47, "computingEff": 89.11},
            {"cpu": 33.55, "power": 63.90, "inletTemp": 44.84, "outletTemp": 56.91, "coolantFlow": 62.39, "computingEff": 88.11},
            {"cpu": 32.87, "power": 63.15, "inletTemp": 45.00, "outletTemp": 58.50, "coolantFlow": 62.01, "computingEff": 87.40},
            {"cpu": 32.81, "power": 64.53, "inletTemp": 44.17, "outletTemp": 58.28, "coolantFlow": 62.08, "computingEff": 87.85},
            {"cpu": 30.57, "power": 60.91, "inletTemp": 45.18, "outletTemp": 57.10, "coolantFlow": 64.28, "computingEff": 90.04},
            {"cpu": 30.89, "power": 64.48, "inletTemp": 44.54, "outletTemp": 58.08, "coolantFlow": 68.00, "computingEff": 91.83}
        ],
        "Medium Load": [
            {"cpu": 54.83, "power": 112.25, "inletTemp": 44.86, "outletTemp": 58.64, "coolantFlow": 78.88, "computingEff": 82.02},
            {"cpu": 52.93, "power": 118.65, "inletTemp": 44.86, "outletTemp": 58.03, "coolantFlow": 78.29, "computingEff": 81.60},
            {"cpu": 55.67, "power": 118.67, "inletTemp": 44.86, "outletTemp": 58.67, "coolantFlow": 75.48, "computingEff": 80.70},
            {"cpu": 55.57, "power": 114.53, "inletTemp": 44.86, "outletTemp": 58.34, "coolantFlow": 76.21, "computingEff": 81.76},
            {"cpu": 51.66, "power": 118.20, "inletTemp": 44.86, "outletTemp": 57.23, "coolantFlow": 77.79, "computingEff": 82.12},
            {"cpu": 52.19, "power": 120.42, "inletTemp": 44.86, "outletTemp": 58.62, "coolantFlow": 75.83, "computingEff": 82.29},
            {"cpu": 55.55, "power": 119.96, "inletTemp": 44.86, "outletTemp": 58.62, "coolantFlow": 75.83, "computingEff": 80.80},
            {"cpu": 52.54, "power": 115.88, "inletTemp": 44.86, "outletTemp": 58.77, "coolantFlow": 75.78, "computingEff": 82.11},
            {"cpu": 54.71, "power": 116.30, "inletTemp": 44.86, "outletTemp": 57.83, "coolantFlow": 78.38, "computingEff": 79.84},
            {"cpu": 55.67, "power": 117.60, "inletTemp": 44.86, "outletTemp": 58.04, "coolantFlow": 77.53, "computingEff": 79.93}
        ],
        "High Load": [
            {"cpu": 73.00, "power": 166.19, "inletTemp": 44.51, "outletTemp": 62.08, "coolantFlow": 88.10, "computingEff": 81.09},
            {"cpu": 78.00, "power": 169.12, "inletTemp": 44.32, "outletTemp": 63.00, "coolantFlow": 89.42, "computingEff": 80.38},
            {"cpu": 75.00, "power": 171.16, "inletTemp": 45.87, "outletTemp": 62.65, "coolantFlow": 89.88, "computingEff": 79.86},
            {"cpu": 79.00, "power": 168.84, "inletTemp": 44.98, "outletTemp": 61.59, "coolantFlow": 89.78, "computingEff": 81.34},
            {"cpu": 73.00, "power": 166.82, "inletTemp": 45.50, "outletTemp": 62.59, "coolantFlow": 90.26, "computingEff": 79.03},
            {"cpu": 71.00, "power": 171.45, "inletTemp": 44.91, "outletTemp": 61.72, "coolantFlow": 88.93, "computingEff": 80.03},
            {"cpu": 72.00, "power": 168.55, "inletTemp": 44.65, "outletTemp": 61.08, "coolantFlow": 90.99, "computingEff": 81.23},
            {"cpu": 72.00, "power": 176.38, "inletTemp": 44.46, "outletTemp": 62.07, "coolantFlow": 89.68, "computingEff": 81.21},
            {"cpu": 73.00, "power": 166.75, "inletTemp": 45.62, "outletTemp": 62.28, "coolantFlow": 89.09, "computingEff": 78.85},
            {"cpu": 72.00, "power": 168.77, "inletTemp": 45.06, "outletTemp": 61.17, "coolantFlow": 88.21, "computingEff": 82.19}
        ]
    }
}

# ==========================================
# 3. POWER TELEMETRY (Racks 1 to 9)
# Format for each rack:
# [servers, activePower, avgPower, peakPower, capacity, utilization]
# ==========================================

power_raw = {
    "rack_1": {
        "Low Load": [
            [16, 57.14, 65.34, 72.81, 199, 28.77],
            [16, 60.28, 59.81, 64.94, 199, 30.35],
            [16, 58.14, 56.93, 63.63, 199, 29.27],
            [16, 57.26, 64.76, 72.23, 199, 28.83],
            [16, 58.38, 57.64, 65.62, 199, 29.39],
            [16, 62.41, 60.93, 69.21, 199, 31.42],
            [16, 62.81, 57.11, 62.15, 199, 31.62],
            [16, 61.77, 62.05, 70.74, 199, 31.10],
            [16, 60.24, 59.96, 69.28, 199, 30.33],
            [16, 56.99, 56.63, 68.07, 199, 28.69]
        ],
        "Medium Load": [
            [16, 91.07, 96.56, 106.97, 199, 45.85],
            [16, 96.15, 95.39, 111.77, 199, 48.41],
            [16, 96.59, 92.72, 101.72, 199, 48.63],
            [16, 91.88, 92.64, 101.63, 199, 46.26],
            [16, 91.71, 98.55, 109.05, 199, 46.17],
            [16, 90.18, 88.20, 101.70, 199, 45.40],
            [16, 90.45, 93.37, 104.14, 199, 45.54],
            [16, 95.00, 93.27, 111.54, 199, 47.83],
            [16, 94.07, 90.25, 106.67, 199, 47.36],
            [16, 96.85, 98.00, 111.19, 199, 48.76]
        ],
        "High Load": [
            [16, 125.73, 123.30, 139.17, 199, 63.30],
            [16, 126.44, 123.12, 140.18, 199, 63.66],
            [16, 121.96, 125.08, 142.42, 199, 61.40],
            [16, 126.68, 118.80, 134.72, 199, 63.78],
            [16, 125.63, 127.99, 135.30, 199, 63.25],
            [16, 121.88, 121.17, 137.24, 199, 61.36],
            [16, 122.81, 122.89, 142.55, 199, 61.83],
            [16, 119.95, 119.87, 136.99, 199, 60.39],
            [16, 124.66, 132.98, 139.31, 199, 62.76],
            [16, 125.89, 123.84, 142.23, 199, 63.38]
        ]
    },
    "rack_2": {
        "Low Load": [
            [17, 60.01, 65.78, 72.68, 213, 28.20],
            [17, 64.12, 67.36, 80.15, 213, 30.13],
            [17, 64.08, 66.15, 76.85, 213, 30.11],
            [17, 64.91, 65.27, 76.04, 213, 30.50],
            [17, 67.59, 61.65, 74.86, 213, 31.76],
            [17, 66.29, 61.95, 68.56, 213, 31.15],
            [17, 64.14, 61.23, 69.43, 213, 30.14],
            [17, 61.95, 65.86, 77.48, 213, 29.11],
            [17, 67.44, 62.05, 74.71, 213, 31.69],
            [17, 62.78, 61.52, 72.71, 213, 29.50]
        ],
        "Medium Load": [
            [17, 97.06, 99.55, 117.47, 213, 45.61],
            [17, 97.45, 96.71, 119.64, 213, 45.79],
            [17, 96.57, 100.55, 112.26, 213, 45.38],
            [17, 97.36, 99.40, 115.47, 213, 45.75],
            [17, 98.11, 105.83, 117.13, 213, 46.10],
            [17, 102.70, 94.20, 105.74, 213, 48.26],
            [17, 103.55, 97.67, 109.51, 213, 48.66],
            [17, 100.96, 97.89, 111.01, 213, 47.44],
            [17, 98.21, 101.90, 116.03, 213, 46.15],
            [17, 98.57, 93.72, 111.11, 213, 46.32]
        ],
        "High Load": [
            [17, 130.05, 133.41, 152.27, 213, 61.11],
            [17, 129.52, 135.71, 147.69, 213, 60.86],
            [17, 133.52, 127.84, 144.80, 213, 62.74],
            [17, 130.50, 132.73, 162.52, 213, 61.32],
            [17, 132.43, 135.07, 153.79, 213, 62.23],
            [17, 131.09, 141.18, 155.97, 213, 61.60],
            [17, 130.65, 125.61, 151.51, 213, 61.39],
            [17, 131.07, 127.57, 157.82, 213, 61.59],
            [17, 127.94, 134.00, 149.76, 213, 60.12],
            [17, 135.86, 131.59, 150.94, 213, 63.84]
        ]
    },
    "rack_3": {
        "Low Load": [
            [18, 82.42, 75.86, 89.15, 227, 36.31],
            [18, 78.04, 87.83, 92.01, 227, 34.38],
            [18, 81.27, 76.82, 90.29, 227, 35.80],
            [18, 83.47, 83.95, 92.83, 227, 36.77],
            [18, 80.18, 82.39, 91.54, 227, 35.32],
            [18, 79.93, 82.42, 94.42, 227, 35.21],
            [18, 80.59, 80.17, 91.85, 227, 35.50],
            [18, 81.04, 81.18, 92.90, 227, 35.70],
            [18, 78.16, 82.29, 97.10, 227, 34.43],
            [18, 83.60, 85.09, 95.63, 227, 36.83]
        ],
        "Medium Load": [
            [18, 129.71, 137.67, 151.17, 227, 57.14],
            [18, 128.21, 124.66, 138.51, 227, 56.48],
            [18, 135.07, 125.31, 150.89, 227, 59.50],
            [18, 125.37, 137.09, 147.85, 227, 55.23],
            [18, 135.16, 138.48, 145.08, 227, 59.54],
            [18, 125.33, 131.33, 144.20, 227, 55.21],
            [18, 125.76, 133.02, 154.52, 227, 55.40],
            [18, 132.36, 133.74, 160.75, 227, 58.31],
            [18, 130.21, 126.74, 148.07, 227, 57.36],
            [18, 127.76, 132.08, 150.03, 227, 56.28]
        ],
        "High Load": [
            [18, 172.91, 178.33, 203.04, 227, 76.17],
            [18, 175.13, 180.37, 192.51, 227, 77.15],
            [18, 168.43, 178.76, 197.67, 227, 74.20],
            [18, 167.34, 177.57, 196.17, 227, 73.72],
            [18, 176.11, 167.78, 198.29, 227, 77.58],
            [18, 175.04, 167.51, 191.44, 227, 77.11],
            [18, 171.84, 175.40, 195.78, 227, 75.70],
            [18, 168.30, 174.47, 204.13, 227, 74.14],
            [18, 171.50, 185.05, 199.15, 227, 75.55],
            [18, 168.73, 171.90, 206.62, 227, 74.33]
        ]
    },
    "rack_4": {
        "Low Load": [
            [18, 164.80, 159.77, 185.86, 227, 72.60],
            [18, 165.12, 179.81, 200.36, 227, 72.74],
            [18, 169.77, 169.49, 199.40, 227, 74.79],
            [18, 170.73, 166.11, 188.91, 227, 75.21],
            [18, 162.51, 174.90, 186.56, 227, 71.59],
            [18, 162.12, 163.75, 183.80, 227, 71.42],
            [18, 164.69, 170.98, 191.49, 227, 72.55],
            [18, 171.77, 167.95, 185.88, 227, 75.67],
            [18, 171.63, 160.75, 178.61, 227, 75.61],
            [18, 162.78, 168.82, 205.00, 227, 71.71]
        ],
        "Medium Load": [
            [18, 162.96, 167.47, 185.53, 227, 71.79],
            [18, 161.99, 170.84, 187.92, 227, 71.36],
            [18, 164.51, 162.44, 194.93, 227, 72.47],
            [18, 166.30, 158.66, 192.66, 227, 73.26],
            [18, 169.59, 163.86, 186.57, 227, 74.71],
            [18, 172.11, 167.81, 194.93, 227, 75.82],
            [18, 171.84, 179.57, 188.12, 227, 75.70],
            [18, 164.64, 168.39, 186.91, 227, 72.53],
            [18, 169.55, 178.36, 193.79, 227, 74.69],
            [18, 171.02, 161.08, 193.96, 227, 75.34]
        ],
        "High Load": [
            [18, 185.39, 191.56, 216.71, 227, 81.67],
            [18, 187.18, 188.75, 210.96, 227, 82.46],
            [18, 178.69, 177.42, 212.91, 227, 78.72],
            [18, 189.48, 200.31, 223.43, 227, 83.47],
            [18, 182.14, 199.42, 214.91, 227, 80.24],
            [18, 185.41, 192.17, 216.19, 227, 81.68],
            [18, 189.59, 192.37, 212.53, 227, 83.52],
            [18, 180.40, 173.94, 212.99, 227, 79.47],
            [18, 178.67, 185.51, 217.69, 227, 78.71],
            [18, 181.35, 178.92, 198.60, 227, 79.89]
        ]
    },
    "rack_5": {
        "Low Load": [
            [15, 66.16, 61.67, 69.22, 184, 35.87],
            [15, 63.93, 62.81, 73.71, 184, 34.66],
            [15, 67.43, 66.95, 78.11, 184, 36.56],
            [15, 64.09, 69.43, 72.73, 184, 34.75],
            [15, 63.28, 60.35, 74.63, 184, 34.31],
            [15, 65.22, 70.76, 81.65, 184, 35.36],
            [15, 65.70, 65.41, 78.89, 184, 35.62],
            [15, 66.71, 69.04, 75.07, 184, 36.17],
            [15, 64.33, 67.12, 73.63, 184, 34.88],
            [15, 65.49, 65.66, 72.23, 184, 35.51]
        ],
        "Medium Load": [
            [15, 107.91, 102.88, 115.11, 184, 58.51],
            [15, 103.06, 106.63, 119.30, 184, 55.88],
            [15, 101.66, 102.73, 126.03, 184, 55.12],
            [15, 105.63, 107.18, 122.50, 184, 57.27],
            [15, 107.32, 110.81, 119.34, 184, 58.19],
            [15, 108.39, 105.03, 120.94, 184, 58.77],
            [15, 103.69, 105.11, 119.77, 184, 56.22],
            [15, 104.74, 109.55, 122.19, 184, 56.79],
            [15, 110.18, 103.27, 116.84, 184, 59.74],
            [15, 103.75, 99.85, 116.32, 184, 56.25]
        ],
        "High Load": [
            [15, 137.13, 140.41, 160.07, 184, 74.35],
            [15, 143.49, 134.82, 165.09, 184, 77.80],
            [15, 137.30, 135.19, 156.82, 184, 74.44],
            [15, 141.35, 148.59, 166.99, 184, 76.64],
            [15, 135.99, 140.40, 152.91, 184, 73.73],
            [15, 134.84, 142.79, 157.89, 184, 73.11],
            [15, 137.06, 132.71, 150.50, 184, 74.31],
            [15, 136.21, 147.59, 159.05, 184, 73.85],
            [15, 142.22, 142.90, 159.23, 184, 77.11],
            [15, 134.95, 134.21, 150.64, 184, 73.17]
        ]
    },
    "rack_6": {
        "Low Load": [
            [15, 63.87, 63.56, 71.74, 184, 34.63],
            [15, 67.26, 62.17, 74.99, 184, 36.47],
            [15, 65.18, 66.23, 75.69, 184, 35.34],
            [15, 63.19, 65.16, 80.61, 184, 34.26],
            [15, 67.30, 70.76, 75.48, 184, 36.49],
            [15, 67.28, 62.84, 76.22, 184, 36.48],
            [15, 65.62, 69.41, 76.68, 184, 35.58],
            [15, 65.05, 67.54, 77.47, 184, 35.27],
            [15, 65.60, 62.21, 69.83, 184, 35.57],
            [15, 64.35, 64.71, 76.59, 184, 34.89]
        ],
        "Medium Load": [
            [15, 105.35, 100.59, 119.06, 184, 57.12],
            [15, 110.00, 101.03, 112.25, 184, 59.64],
            [15, 103.01, 98.81, 115.11, 184, 55.85],
            [15, 103.78, 107.70, 113.92, 184, 56.27],
            [15, 110.11, 101.51, 117.21, 184, 59.70],
            [15, 104.87, 110.16, 126.69, 184, 56.86],
            [15, 104.34, 99.88, 115.17, 184, 56.57],
            [15, 102.09, 100.90, 118.59, 184, 55.35],
            [15, 109.00, 109.61, 124.80, 184, 59.10],
            [15, 108.32, 111.79, 125.76, 184, 58.73]
        ],
        "High Load": [
            [15, 134.97, 142.53, 171.04, 184, 73.18],
            [15, 142.22, 143.22, 165.47, 184, 77.11],
            [15, 139.97, 134.04, 162.77, 184, 75.89],
            [15, 136.78, 148.08, 168.02, 184, 74.16],
            [15, 139.12, 143.85, 156.18, 184, 75.43],
            [15, 135.58, 143.33, 168.63, 184, 73.51],
            [15, 140.76, 135.54, 156.08, 184, 76.32],
            [15, 138.14, 141.68, 164.35, 184, 74.90],
            [15, 136.94, 134.26, 155.96, 184, 74.25],
            [15, 135.49, 140.89, 171.31, 184, 73.46]
        ]
    },
    "rack_7": {
        "Low Load": [
            [15, 75.12, 73.85, 90.43, 184, 40.73],
            [15, 70.90, 77.02, 80.69, 184, 38.44],
            [15, 71.60, 72.56, 79.67, 184, 38.82],
            [15, 72.32, 80.40, 78.70, 184, 39.21],
            [15, 72.37, 75.44, 81.36, 184, 39.24],
            [15, 74.24, 77.89, 83.82, 184, 40.25],
            [15, 74.40, 71.17, 76.75, 184, 40.34],
            [15, 71.32, 68.97, 78.12, 184, 38.67],
            [15, 75.38, 66.46, 79.48, 184, 40.87],
            [15, 72.39, 71.94, 82.63, 184, 39.25]
        ],
        "Medium Load": [
            [15, 117.19, 116.45, 131.29, 184, 63.54],
            [15, 110.04, 115.98, 139.90, 184, 59.66],
            [15, 112.19, 111.24, 126.15, 184, 60.83],
            [15, 120.92, 114.51, 133.41, 184, 65.56],
            [15, 113.85, 111.77, 133.01, 184, 61.73],
            [15, 120.90, 112.30, 129.66, 184, 65.55],
            [15, 110.13, 117.87, 133.74, 184, 59.71],
            [15, 112.93, 109.10, 124.69, 184, 61.23],
            [15, 111.90, 114.12, 136.48, 184, 60.67],
            [15, 113.36, 114.28, 124.47, 184, 61.46]
        ],
        "High Load": [
            [15, 146.06, 147.28, 178.52, 184, 79.19],
            [15, 148.01, 149.15, 162.18, 184, 80.25],
            [15, 156.99, 149.99, 172.05, 184, 85.12],
            [15, 149.12, 155.82, 169.71, 184, 80.85],
            [15, 149.17, 143.80, 174.62, 184, 80.88],
            [15, 146.70, 147.02, 181.88, 184, 79.54],
            [15, 147.05, 160.47, 177.45, 184, 79.73],
            [15, 145.52, 150.69, 181.14, 184, 78.90],
            [15, 148.51, 154.88, 171.42, 184, 80.52],
            [15, 145.12, 147.20, 173.70, 184, 78.68]
        ]
    },
    "rack_8": {
        "Low Load": [
            [17, 77.76, 73.53, 84.67, 213, 36.54],
            [17, 77.10, 80.14, 86.31, 213, 36.23],
            [17, 77.49, 74.71, 87.54, 213, 36.41],
            [17, 72.95, 73.49, 86.85, 213, 34.28],
            [17, 73.55, 74.19, 83.65, 213, 34.56],
            [17, 77.02, 77.00, 81.44, 213, 36.19],
            [17, 76.12, 79.20, 88.42, 213, 35.77],
            [17, 77.78, 71.86, 79.85, 213, 36.55],
            [17, 73.42, 80.82, 84.67, 213, 34.50],
            [17, 77.72, 77.64, 90.97, 213, 36.52]
        ],
        "Medium Load": [
            [17, 118.39, 121.63, 147.69, 213, 55.63],
            [17, 125.13, 130.07, 149.01, 213, 58.80],
            [17, 125.16, 123.14, 141.08, 213, 58.81],
            [17, 120.79, 125.60, 142.61, 213, 56.76],
            [17, 124.67, 118.21, 133.89, 213, 58.58],
            [17, 127.01, 125.42, 141.56, 213, 59.68],
            [17, 126.52, 119.59, 130.25, 213, 59.45],
            [17, 122.22, 122.77, 140.48, 213, 57.43],
            [17, 122.67, 127.61, 151.62, 213, 57.64],
            [17, 124.03, 121.70, 134.95, 213, 58.28]
        ],
        "High Load": [
            [17, 155.80, 160.07, 183.84, 213, 73.21],
            [17, 158.55, 158.74, 177.79, 213, 74.50],
            [17, 160.46, 168.77, 196.90, 213, 75.40],
            [17, 158.29, 164.64, 189.10, 213, 74.38],
            [17, 156.40, 166.51, 197.84, 213, 73.40],
            [17, 160.74, 157.42, 181.77, 213, 75.53],
            [17, 158.01, 163.26, 190.20, 213, 74.25],
            [17, 165.36, 164.82, 185.42, 213, 77.70],
            [17, 156.33, 169.29, 180.57, 213, 73.46],
            [17, 158.23, 163.05, 191.05, 213, 74.35]
        ]
    },
    "rack_9": {
        "Low Load": [
            [14, 64.51, 67.74, 96.77, 177, 36.54],
            [14, 63.97, 67.16, 95.95, 177, 36.23],
            [14, 64.28, 67.50, 96.43, 177, 36.41],
            [14, 60.52, 63.55, 90.78, 177, 34.28],
            [14, 61.02, 64.07, 91.53, 177, 34.56],
            [14, 63.90, 67.09, 95.84, 177, 36.19],
            [14, 63.15, 66.31, 94.73, 177, 35.77],
            [14, 64.53, 67.76, 96.80, 177, 36.55],
            [14, 60.91, 63.96, 91.37, 177, 34.50],
            [14, 64.48, 67.70, 96.72, 177, 36.52]
        ],
        "Medium Load": [
            [16, 112.25, 117.86, 168.37, 202, 55.63],
            [16, 118.65, 124.58, 177.97, 202, 58.80],
            [16, 118.67, 124.60, 178.00, 202, 58.81],
            [16, 114.53, 120.26, 171.79, 202, 56.76],
            [16, 118.20, 124.11, 177.30, 202, 58.58],
            [16, 120.42, 126.44, 180.63, 202, 59.68],
            [16, 119.96, 125.95, 179.94, 202, 59.45],
            [16, 115.88, 121.68, 173.82, 202, 57.43],
            [16, 116.30, 122.12, 174.46, 202, 57.64],
            [16, 117.60, 123.48, 176.39, 202, 58.28]
        ],
        "High Load": [
            [18, 166.19, 174.50, 249.28, 227, 73.21],
            [18, 169.12, 177.57, 253.67, 227, 74.50],
            [18, 171.16, 179.72, 256.74, 227, 75.40],
            [18, 168.84, 177.28, 253.26, 227, 74.38],
            [18, 166.82, 175.16, 250.23, 227, 73.49],
            [18, 171.45, 180.03, 257.18, 227, 75.53],
            [18, 168.55, 176.97, 252.82, 227, 74.25],
            [18, 176.38, 185.20, 264.57, 227, 77.70],
            [18, 166.75, 175.09, 250.13, 227, 73.46],
            [18, 168.77, 177.21, 253.16, 227, 74.35]
        ]
    }
}

# Convert power_raw to structured dict with dict items

power_telemetry = {}
for r_id, scenarios in power_raw.items():
    power_telemetry[r_id] = {}
    for sc, rows in scenarios.items():
        power_telemetry[r_id][sc] = []
        for row in rows:
            power_telemetry[r_id][sc].append({
                "servers": row[0],
                "activePower": row[1],
                "avgPower": row[2],
                "peakPower": row[3],
                "capacity": row[4],
                "utilization": row[5]
            })

# ==========================================
# 4. COOLING TELEMETRY (Liquid Cooling & Air Cooled)
# ==========================================

liquid_raw = {
    "rack_1": {
        "Low Load": [
            [45.78, 57.86, 12.08, 63.38, 44, 86],
            [44.88, 57.10, 12.22, 61.73, 47, 86],
            [44.93, 56.83, 11.90, 60.20, 45, 87],
            [45.67, 57.64, 11.97, 61.93, 44, 86],
            [44.75, 57.69, 12.95, 63.47, 46, 87],
            [44.84, 56.91, 12.07, 62.39, 49, 87],
            [45.00, 58.50, 13.50, 62.01, 49, 87],
            [44.17, 58.28, 14.11, 62.08, 49, 87],
            [45.18, 57.10, 11.92, 64.28, 47, 87],
            [44.54, 58.08, 13.55, 68.00, 45, 87]
        ],
        "Medium Load": [
            [46.00, 59.16, 13.56, 76.82, 73, 89],
            [45.00, 59.12, 14.37, 76.97, 77, 89],
            [44.00, 58.67, 14.25, 77.20, 76, 88],
            [44.00, 59.24, 15.13, 77.49, 74, 89],
            [45.00, 58.79, 14.11, 73.29, 71, 86],
            [45.00, 59.49, 14.37, 74.27, 70, 86],
            [45.00, 59.10, 14.20, 76.43, 74, 91],
            [46.00, 58.23, 12.65, 75.03, 75, 87],
            [45.00, 58.54, 13.40, 75.99, 74, 87],
            [44.00, 58.03, 13.96, 68.00, 77, 88]
        ],
        "High Load": [
            [45.00, 59.54, 14.88, 85.06, 97, 86],
            [45.00, 60.25, 15.72, 85.27, 93, 81],
            [46.00, 58.11, 12.34, 83.52, 92, 84],
            [45.00, 59.73, 15.08, 85.89, 95, 83],
            [45.00, 60.08, 15.34, 83.73, 96, 85],
            [45.00, 57.71, 12.95, 84.83, 93, 85],
            [45.00, 58.87, 14.25, 83.40, 95, 86],
            [46.00, 57.78, 12.10, 85.39, 90, 83],
            [45.00, 58.11, 13.26, 83.68, 93, 84],
            [46.00, 60.04, 14.32, 68.00, 95, 84]
        ]
    },
    "rack_2": {
        "Low Load": [
            [44.68, 57.57, 12.89, 60.20, 47, 87],
            [44.17, 57.20, 13.03, 61.58, 50, 87],
            [44.22, 57.22, 13.01, 63.63, 50, 86],
            [44.49, 57.22, 12.73, 64.01, 51, 87],
            [45.92, 55.00, 9.08, 60.70, 52, 86],
            [44.82, 57.67, 12.85, 63.50, 52, 87],
            [44.08, 57.03, 12.95, 63.91, 51, 87],
            [44.08, 57.91, 13.84, 68.00, 49, 88],
            [44.63, 58.43, 13.80, 60.55, 53, 87],
            [44.63, 58.04, 13.40, 60.02, 49, 88]
        ],
        "Medium Load": [
            [45.00, 58.87, 14.04, 77.07, 79, 91],
            [44.00, 58.25, 14.01, 76.01, 78, 89],
            [45.00, 58.71, 14.05, 76.56, 76, 88],
            [45.00, 58.69, 14.16, 75.23, 79, 90],
            [45.00, 58.09, 13.01, 73.84, 78, 88],
            [45.00, 59.00, 14.38, 77.39, 84, 91],
            [45.00, 59.64, 14.67, 73.24, 83, 89],
            [45.00, 58.38, 13.74, 73.99, 80, 89],
            [44.00, 59.20, 15.13, 73.43, 81, 90],
            [45.00, 58.80, 13.99, 68.00, 80, 90]
        ],
        "High Load": [
            [46.00, 58.15, 12.37, 85.79, 100, 86],
            [44.00, 57.80, 13.42, 85.92, 99, 85],
            [45.00, 57.89, 12.79, 83.27, 103, 86],
            [46.00, 58.06, 12.32, 84.69, 99, 84],
            [46.00, 59.56, 13.96, 83.70, 99, 83],
            [44.00, 58.71, 14.35, 84.79, 99, 84],
            [46.00, 60.62, 15.03, 85.31, 97, 82],
            [46.00, 58.23, 12.54, 85.47, 97, 82],
            [44.00, 60.71, 16.28, 83.67, 95, 82],
            [44.00, 59.56, 15.15, 68.00, 101, 82]
        ]
    },
    "rack_3": {
        "Low Load": [
            [44.72, 60.39, 15.67, 65.84, 69, 94],
            [45.35, 55.00, 9.65, 68.00, 63, 90],
            [45.83, 59.55, 13.73, 65.01, 66, 90],
            [45.60, 59.98, 14.38, 62.00, 70, 93],
            [44.22, 59.95, 15.74, 65.21, 65, 90],
            [44.24, 60.69, 16.45, 65.70, 64, 89],
            [45.42, 59.88, 14.46, 62.03, 65, 90],
            [44.82, 59.90, 15.09, 67.20, 67, 91],
            [44.75, 60.74, 15.99, 63.85, 64, 91],
            [45.28, 61.08, 15.80, 68.00, 68, 90]
        ],
        "Medium Load": [
            [46.00, 61.60, 16.04, 76.57, 98, 84],
            [44.00, 61.68, 17.39, 79.16, 96, 84],
            [46.00, 61.00, 15.46, 74.90, 101, 83],
            [46.00, 61.25, 15.73, 77.01, 95, 84],
            [45.00, 60.98, 15.60, 78.13, 102, 84],
            [45.00, 60.15, 15.38, 80.44, 94, 83],
            [45.00, 61.02, 16.29, 75.20, 93, 83],
            [45.00, 60.90, 15.86, 80.22, 100, 84],
            [46.00, 60.88, 15.34, 74.85, 97, 83],
            [46.00, 61.25, 15.58, 68.00, 96, 83]
        ],
        "High Load": [
            [45.00, 62.03, 16.71, 88.64, 129, 82],
            [44.00, 61.73, 17.32, 90.05, 128, 81],
            [45.00, 62.03, 17.34, 86.93, 125, 82],
            [45.00, 62.49, 17.83, 85.74, 125, 83],
            [45.00, 62.12, 16.77, 89.77, 129, 82],
            [45.00, 62.34, 17.51, 88.47, 129, 81],
            [45.00, 62.49, 17.52, 87.10, 127, 82],
            [44.00, 62.14, 17.82, 84.86, 124, 82],
            [46.00, 62.88, 17.18, 87.58, 128, 82],
            [44.00, 62.08, 17.59, 68.00, 124, 81]
        ]
    },
    "rack_4": {
        "Low Load": [
            [51.83, 77.76, 25.93, 86.48, 116, 78],
            [51.02, 76.58, 25.55, 85.61, 121, 81],
            [52.13, 77.36, 25.23, 68.00, 125, 82],
            [52.82, 55.00, 2.18, 89.04, 126, 82],
            [52.45, 77.88, 25.43, 88.61, 121, 83],
            [51.35, 77.04, 25.70, 88.44, 114, 78],
            [51.85, 76.97, 25.12, 86.68, 116, 78],
            [51.14, 78.30, 27.16, 89.22, 120, 77],
            [51.69, 76.65, 24.96, 88.34, 124, 80],
            [52.52, 76.95, 24.42, 86.60, 118, 77]
        ],
        "Medium Load": [
            [49.00, 65.21, 16.42, 85.71, 114, 78],
            [49.00, 65.50, 16.16, 84.99, 114, 78],
            [50.00, 65.44, 15.66, 85.95, 117, 79],
            [49.00, 65.79, 16.32, 89.12, 119, 79],
            [50.00, 64.57, 14.94, 86.65, 121, 79],
            [50.00, 65.40, 15.84, 85.44, 125, 81],
            [48.00, 65.87, 17.49, 88.01, 123, 80],
            [49.00, 65.56, 16.59, 85.79, 122, 83],
            [49.00, 65.58, 16.24, 84.98, 123, 81],
            [49.00, 64.35, 14.87, 68.00, 127, 82]
        ],
        "High Load": [
            [45.00, 64.16, 18.59, 94.75, 131, 78],
            [45.00, 64.29, 18.84, 95.78, 132, 79],
            [46.00, 64.51, 18.55, 99.85, 127, 79],
            [44.00, 67.43, 22.93, 94.64, 134, 79],
            [45.00, 68.24, 22.64, 99.81, 129, 78],
            [46.00, 67.04, 21.22, 98.02, 131, 78],
            [45.00, 65.31, 20.28, 100.65, 136, 80],
            [46.00, 63.96, 18.22, 96.67, 128, 79],
            [45.00, 68.33, 23.11, 96.58, 128, 79],
            [45.00, 65.31, 20.40, 68.00, 129, 79]
        ]
    },
    "rack_5": {
        "Low Load": [
            [44.54, 60.27, 15.73, 62.17, 55, 92],
            [45.88, 60.59, 14.71, 61.50, 53, 92],
            [44.33, 60.02, 15.69, 67.48, 56, 92],
            [44.82, 60.25, 15.43, 65.58, 53, 92],
            [44.45, 60.22, 15.77, 65.14, 51, 89],
            [44.84, 60.98, 16.14, 64.41, 53, 91],
            [45.00, 60.76, 15.76, 68.00, 53, 90],
            [44.52, 59.51, 14.99, 64.16, 54, 91],
            [45.00, 55.00, 10.00, 67.43, 53, 92],
            [44.88, 60.39, 15.51, 67.61, 55, 93]
        ],
        "Medium Load": [
            [44.00, 61.23, 16.81, 75.70, 81, 84],
            [44.00, 61.30, 16.93, 79.38, 77, 83],
            [44.00, 61.60, 17.49, 74.82, 76, 82],
            [44.00, 60.94, 16.76, 77.54, 78, 82],
            [45.00, 61.04, 15.88, 77.39, 80, 83],
            [45.00, 61.08, 16.20, 75.83, 80, 83],
            [46.00, 61.56, 15.91, 78.23, 78, 83],
            [45.00, 60.11, 14.79, 79.97, 79, 83],
            [44.00, 60.50, 16.30, 76.77, 82, 83],
            [45.00, 60.73, 16.09, 68.00, 77, 82]
        ],
        "High Load": [
            [44.00, 61.81, 17.47, 89.70, 102, 82],
            [45.00, 61.71, 16.93, 88.92, 106, 82],
            [45.00, 61.73, 17.18, 87.00, 101, 82],
            [44.00, 62.53, 18.08, 84.93, 105, 82],
            [45.00, 62.10, 17.46, 88.55, 101, 82],
            [45.00, 61.71, 16.26, 88.46, 100, 83],
            [46.00, 61.42, 15.60, 87.99, 101, 82],
            [45.00, 61.81, 16.37, 86.50, 101, 82],
            [46.00, 61.66, 15.92, 90.49, 104, 82],
            [45.00, 62.36, 17.66, 68.00, 99, 81]
        ]
    },
    "rack_6": {
        "Low Load": [
            [44.31, 60.37, 16.06, 63.28, 52, 91],
            [44.28, 59.90, 15.62, 61.69, 57, 94],
            [45.00, 61.11, 16.11, 64.43, 54, 93],
            [45.05, 59.98, 14.93, 65.52, 51, 90],
            [45.69, 60.52, 14.82, 64.79, 57, 94],
            [45.90, 59.83, 13.93, 65.48, 55, 91],
            [45.35, 55.00, 9.65, 68.00, 53, 90],
            [44.28, 61.13, 16.85, 67.34, 54, 92],
            [45.53, 60.27, 14.74, 65.27, 54, 92],
            [44.19, 60.47, 16.27, 63.93, 53, 91]
        ],
        "Medium Load": [
            [44.00, 60.34, 16.12, 77.65, 78, 83],
            [45.00, 61.08, 16.03, 74.92, 82, 83],
            [44.00, 60.38, 16.11, 80.35, 76, 82],
            [44.00, 60.57, 16.21, 78.28, 77, 82],
            [46.00, 60.81, 15.12, 75.40, 83, 84],
            [45.00, 61.50, 16.53, 75.60, 78, 83],
            [45.00, 61.45, 16.55, 80.70, 78, 83],
            [45.00, 61.31, 16.50, 75.63, 77, 84],
            [45.00, 61.10, 16.07, 80.29, 82, 83],
            [45.00, 61.08, 15.59, 68.00, 81, 83]
        ],
        "High Load": [
            [45.00, 62.66, 17.38, 89.91, 99, 81],
            [45.00, 61.79, 17.28, 89.19, 105, 82],
            [46.00, 62.53, 16.67, 85.03, 104, 83],
            [44.00, 61.00, 17.25, 85.20, 100, 81],
            [45.00, 62.34, 17.35, 85.84, 103, 82],
            [46.00, 62.66, 16.80, 90.08, 99, 81],
            [44.00, 61.51, 17.13, 88.70, 105, 83],
            [45.00, 61.73, 16.97, 89.02, 101, 82],
            [44.00, 62.36, 18.04, 88.31, 100, 82],
            [45.00, 61.69, 17.07, 68.00, 100, 81]
        ]
    },
    "rack_7": {
        "Low Load": [
            [46.87, 55.00, 8.13, 72.45, 61, 90],
            [44.12, 61.77, 17.65, 72.20, 60, 93],
            [46.94, 59.98, 13.04, 75.48, 59, 92],
            [46.45, 59.90, 13.45, 68.00, 60, 92],
            [45.00, 59.44, 14.44, 75.81, 58, 90],
            [45.16, 62.60, 17.44, 68.87, 60, 90],
            [47.45, 60.10, 12.65, 72.71, 61, 91],
            [45.25, 61.89, 16.64, 70.15, 58, 90],
            [47.24, 63.56, 16.32, 71.70, 61, 89],
            [44.17, 60.98, 16.81, 75.80, 58, 89]
        ],
        "Medium Load": [
            [47.00, 62.86, 15.46, 82.14, 92, 88],
            [44.00, 61.25, 16.76, 84.73, 86, 87],
            [44.00, 60.42, 16.18, 88.82, 89, 88],
            [47.00, 60.71, 14.17, 86.58, 99, 91],
            [48.00, 62.26, 14.67, 83.52, 91, 88],
            [47.00, 61.74, 15.18, 84.28, 99, 91],
            [45.00, 61.00, 16.19, 83.32, 85, 86],
            [47.00, 63.44, 16.37, 86.83, 91, 90],
            [45.00, 60.55, 15.62, 84.31, 90, 89],
            [45.00, 62.76, 17.26, 68.00, 91, 89]
        ],
        "High Load": [
            [46.00, 68.32, 22.75, 98.81, 105, 80],
            [45.00, 64.62, 19.27, 97.29, 106, 80],
            [46.00, 64.55, 18.70, 97.55, 111, 78],
            [45.00, 63.77, 18.82, 95.58, 107, 80],
            [45.00, 65.85, 20.71, 100.16, 106, 79],
            [45.00, 66.41, 21.65, 95.95, 103, 78],
            [45.00, 67.35, 22.84, 100.64, 104, 79],
            [45.00, 67.72, 22.25, 96.43, 103, 78],
            [45.00, 68.06, 23.33, 96.58, 104, 79],
            [46.00, 65.61, 19.85, 68.00, 104, 78]
        ]
    },
    "rack_8": {
        "Low Load": [
            [45.90, 60.96, 15.06, 65.60, 64, 92],
            [44.17, 60.88, 16.71, 62.64, 64, 92],
            [45.32, 60.05, 14.73, 67.31, 64, 92],
            [45.28, 60.81, 15.53, 64.99, 59, 90],
            [44.08, 59.24, 15.16, 62.72, 61, 93],
            [44.33, 59.41, 15.08, 68.00, 63, 91],
            [45.78, 59.88, 14.09, 62.36, 62, 90],
            [45.00, 55.00, 10.00, 66.78, 63, 90],
            [45.00, 60.69, 15.69, 61.56, 60, 90],
            [44.15, 60.32, 16.17, 67.01, 66, 94]
        ],
        "Medium Load": [
            [45.00, 60.92, 15.53, 79.82, 88, 82],
            [45.00, 61.12, 16.18, 78.89, 94, 84],
            [45.00, 61.10, 16.42, 80.34, 94, 84],
            [45.00, 60.86, 15.67, 77.30, 91, 84],
            [46.00, 61.37, 15.86, 79.92, 93, 83],
            [45.00, 60.67, 15.99, 75.37, 94, 83],
            [46.00, 60.59, 14.99, 75.86, 94, 83],
            [46.00, 61.37, 15.77, 75.35, 92, 83],
            [45.00, 61.23, 16.33, 80.85, 92, 83],
            [45.00, 61.68, 16.78, 68.00, 92, 82]
        ],
        "High Load": [
            [45.00, 61.66, 16.80, 90.10, 115, 81],
            [46.00, 61.62, 16.02, 88.29, 118, 83],
            [45.00, 61.97, 17.06, 87.38, 118, 82],
            [45.00, 62.31, 17.24, 85.74, 116, 81],
            [45.00, 61.73, 17.12, 85.99, 115, 82],
            [45.00, 61.53, 16.08, 90.76, 120, 83],
            [45.00, 62.47, 16.98, 89.05, 116, 81],
            [46.00, 61.56, 15.94, 85.36, 123, 82],
            [45.00, 61.47, 16.56, 90.94, 115, 81],
            [46.00, 62.71, 17.09, 68.00, 117, 82]
        ]
    },
    "rack_9": {
        "Low Load": [
            [45.78, 57.86, 12.08, 63.38, 53, 92],
            [45.00, 57.10, 12.10, 61.73, 53, 92],
            [44.93, 55.00, 10.07, 60.20, 53, 92],
            [45.67, 57.64, 11.97, 61.93, 49, 90],
            [44.75, 57.69, 12.95, 63.47, 51, 93],
            [44.84, 56.91, 12.07, 62.39, 52, 91],
            [45.00, 58.50, 13.50, 62.01, 51, 90],
            [44.17, 58.28, 14.11, 62.08, 53, 90],
            [45.18, 57.10, 11.92, 64.28, 50, 90],
            [44.54, 58.08, 13.55, 68.00, 54, 94]
        ],
        "Medium Load": [
            [45.00, 58.64, 13.78, 78.88, 83, 82],
            [45.00, 58.03, 13.17, 78.29, 89, 84],
            [45.00, 58.67, 13.81, 75.48, 89, 84],
            [45.00, 58.34, 13.48, 76.21, 86, 84],
            [45.00, 57.23, 12.37, 77.79, 88, 83],
            [45.00, 58.62, 13.76, 75.83, 89, 83],
            [45.00, 58.62, 13.76, 75.83, 89, 83],
            [45.00, 58.77, 13.91, 75.78, 87, 84],
            [45.00, 57.83, 12.97, 78.38, 87, 83],
            [45.00, 58.04, 13.18, 77.53, 87, 82]
        ],
        "High Load": [
            [45.00, 62.08, 17.56, 88.10, 123, 82],
            [44.00, 63.00, 18.68, 89.42, 126, 83],
            [46.00, 62.65, 16.78, 89.88, 126, 82],
            [45.00, 61.59, 16.61, 89.78, 123, 81],
            [46.00, 62.59, 17.09, 90.26, 122, 82],
            [45.00, 61.72, 16.81, 88.93, 128, 83],
            [45.00, 61.08, 16.43, 90.99, 123, 81],
            [44.00, 62.07, 17.61, 89.68, 131, 82],
            [46.00, 62.28, 16.67, 80.09, 123, 81],
            [45.00, 61.17, 16.10, 88.21, 125, 82]
        ]
    }
}

# Air Cooled: Racks 1 to 6 (Racks 7 to 9 will use Rack 1-3 baseline with small offset pending user's data)
# Format: [hallSupply, hallReturn, deltaT, airflow, heatRemoval, coolingEff]
air_raw = {
    "rack_1": {
        "Low Load": [
            [24.98, 30.49, 5.52, 1176.99, 3.70, 87.80],
            [24.38, 31.02, 6.64, 1164.95, 4.41, 87.84],
            [25.07, 30.93, 5.86, 1170.82, 3.91, 86.61],
            [24.73, 30.51, 5.77, 1163.03, 3.83, 87.26],
            [24.78, 30.29, 5.51, 1167.92, 3.67, 86.25],
            [24.93, 30.81, 5.88, 1159.14, 3.88, 87.84],
            [24.55, 31.05, 6.50, 1179.31, 4.37, 87.52],
            [25.23, 30.58, 5.35, 1159.08, 3.53, 86.33],
            [24.64, 30.65, 6.00, 1178.85, 4.03, 86.80],
            [24.91, 30.90, 5.99, 1178.51, 4.02, 87.67]
        ],
        "Medium Load": [
            [26.18, 33.02, 6.84, 1429.82, 5.57, 86.53],
            [25.75, 33.22, 7.47, 1440.29, 6.13, 87.49],
            [26.31, 33.44, 7.13, 1438.66, 5.84, 86.56],
            [25.47, 32.74, 7.27, 1442.66, 5.97, 86.57],
            [26.30, 33.29, 6.99, 1441.58, 5.74, 87.83],
            [25.48, 32.79, 7.31, 1405.38, 5.85, 86.68],
            [26.34, 33.32, 6.98, 1435.00, 5.71, 87.13],
            [25.47, 33.44, 7.97, 1426.69, 6.48, 86.42],
            [26.29, 33.24, 6.95, 1440.54, 5.71, 87.38],
            [25.62, 33.43, 7.81, 1438.98, 6.40, 86.37]
        ],
        "High Load": [
            [27.21, 34.76, 7.55, 1599.67, 6.88, 82.28],
            [26.87, 35.40, 8.53, 1550.98, 7.54, 82.67],
            [27.14, 34.60, 7.45, 1593.39, 6.77, 84.31],
            [27.26, 34.07, 6.81, 1577.92, 6.12, 83.66],
            [26.69, 36.04, 9.34, 1519.78, 8.09, 82.85],
            [27.39, 35.71, 8.33, 1529.16, 7.26, 85.82],
            [27.52, 35.46, 7.94, 1600.88, 7.24, 82.53],
            [27.55, 35.58, 8.03, 1538.12, 7.04, 85.43],
            [27.22, 35.59, 8.36, 1537.13, 7.32, 84.56],
            [27.41, 34.13, 6.72, 1534.57, 5.88, 82.48]
        ]
    },
    "rack_2": {
        "Low Load": [
            [24.71, 31.05, 6.33, 1166.16, 4.21, 87.26],
            [24.32, 30.26, 5.94, 1168.65, 3.95, 86.38],
            [24.86, 30.92, 6.06, 1160.93, 4.01, 86.25],
            [24.83, 30.51, 5.68, 1174.67, 3.80, 86.87],
            [24.61, 30.36, 5.75, 1174.19, 3.85, 87.59],
            [24.42, 30.28, 5.86, 1173.32, 3.92, 87.37],
            [25.06, 31.18, 6.13, 1180.56, 4.12, 86.20],
            [24.79, 30.96, 6.17, 1179.86, 4.15, 86.34],
            [24.72, 30.76, 6.03, 1159.59, 3.99, 87.68],
            [24.71, 30.67, 5.96, 1168.85, 3.97, 86.15]
        ],
        "Medium Load": [
            [25.95, 32.82, 6.87, 1433.96, 5.61, 87.89],
            [25.86, 33.61, 7.74, 1414.12, 6.24, 86.88],
            [25.92, 33.32, 7.40, 1420.73, 5.99, 87.41],
            [26.38, 33.05, 6.67, 1436.93, 5.46, 86.55],
            [26.06, 33.43, 7.37, 1426.82, 5.99, 86.52],
            [25.73, 32.75, 7.03, 1436.84, 5.75, 86.36],
            [25.67, 33.02, 7.35, 1418.51, 5.94, 87.82],
            [25.51, 33.44, 7.94, 1421.52, 6.43, 87.77],
            [26.03, 33.73, 7.71, 1401.47, 6.15, 87.43],
            [25.84, 32.84, 7.00, 1403.02, 5.60, 87.14]
        ],
        "High Load": [
            [27.44, 36.11, 8.67, 1621.02, 8.01, 85.11],
            [26.67, 34.82, 8.15, 1546.87, 7.18, 84.25],
            [26.79, 35.61, 8.83, 1566.42, 7.88, 84.24],
            [26.97, 34.55, 7.58, 1617.27, 6.98, 84.46],
            [26.90, 35.44, 8.54, 1506.03, 7.32, 81.33],
            [27.37, 34.26, 6.88, 1611.53, 6.32, 85.59],
            [27.50, 34.73, 7.23, 1600.22, 6.60, 81.15],
            [27.17, 34.68, 7.52, 1518.28, 6.50, 85.63],
            [27.22, 34.46, 7.23, 1610.12, 6.64, 81.63],
            [27.36, 35.73, 8.36, 1530.27, 7.29, 85.69]
        ]
    },
    "rack_3": {
        "Low Load": [
            [24.55, 32.00, 7.45, 1213.38, 5.15, 89.23],
            [25.16, 32.18, 7.01, 1215.79, 4.86, 88.83],
            [24.62, 31.77, 7.15, 1188.17, 4.84, 89.52],
            [25.16, 31.91, 6.75, 1187.95, 4.57, 89.59],
            [24.44, 32.34, 7.90, 1199.40, 5.40, 89.61],
            [24.93, 32.16, 7.23, 1196.17, 4.93, 88.81],
            [25.10, 32.19, 7.08, 1187.09, 4.79, 88.84],
            [24.65, 32.28, 7.62, 1216.78, 5.28, 88.29],
            [25.18, 32.43, 7.24, 1214.31, 5.01, 89.80],
            [24.82, 32.18, 7.36, 1185.85, 4.97, 88.84]
        ],
        "Medium Load": [
            [26.08, 34.35, 8.26, 1459.71, 6.87, 84.23],
            [26.11, 34.06, 7.95, 1485.28, 6.73, 84.19],
            [25.71, 34.90, 9.18, 1460.16, 7.64, 85.89],
            [25.70, 34.83, 9.13, 1465.96, 7.63, 85.40],
            [25.85, 34.55, 8.69, 1512.92, 7.49, 85.15],
            [25.84, 34.65, 8.81, 1493.27, 7.49, 85.52],
            [26.16, 34.83, 8.67, 1453.29, 7.18, 85.45],
            [25.97, 34.30, 8.33, 1506.74, 7.15, 84.49],
            [26.36, 34.16, 7.80, 1463.33, 6.50, 84.78],
            [26.39, 34.43, 8.04, 1491.11, 6.83, 85.59]
        ],
        "High Load": [
            [27.13, 37.12, 9.99, 1763.39, 10.03, 81.86],
            [26.96, 36.97, 10.01, 1670.12, 9.52, 81.55],
            [27.42, 37.93, 10.51, 1767.32, 10.59, 82.59],
            [26.63, 37.39, 10.77, 1763.08, 10.82, 82.74],
            [26.80, 36.94, 10.14, 1755.90, 10.15, 81.88],
            [27.44, 36.97, 9.52, 1671.15, 9.07, 82.77],
            [27.29, 37.16, 9.86, 1719.56, 9.66, 82.35],
            [27.09, 38.33, 11.25, 1628.03, 10.43, 82.61],
            [27.44, 38.40, 10.95, 1706.43, 10.65, 81.73],
            [27.12, 37.87, 10.75, 1724.05, 10.56, 82.78]
        ]
    },
    "rack_4": {
        "Low Load": [
            [27.13, 37.16, 10.02, 1527.76, 8.73, 80.89],
            [27.10, 36.83, 9.73, 1523.65, 8.45, 79.57],
            [27.04, 36.73, 9.69, 1539.35, 8.50, 77.39],
            [27.37, 36.52, 9.14, 1520.50, 7.92, 82.37],
            [26.79, 36.94, 10.16, 1556.90, 9.01, 78.33],
            [26.74, 37.16, 10.42, 1568.40, 9.31, 79.54],
            [27.37, 36.94, 9.57, 1588.15, 8.66, 77.59],
            [26.72, 36.83, 10.11, 1566.71, 9.03, 82.10],
            [27.50, 36.83, 9.33, 1589.03, 8.45, 82.14],
            [26.99, 36.69, 9.70, 1524.14, 8.42, 80.15]
        ],
        "Medium Load": [
            [26.66, 37.51, 10.85, 1517.72, 9.38, 77.66],
            [27.34, 36.90, 9.56, 1563.19, 8.52, 79.40],
            [26.71, 37.48, 10.78, 1528.14, 9.38, 81.31],
            [27.36, 37.44, 10.08, 1531.97, 8.80, 82.79],
            [26.78, 37.41, 10.63, 1530.98, 9.27, 82.83],
            [26.75, 36.68, 9.93, 1536.26, 8.69, 80.79],
            [26.98, 37.18, 10.20, 1532.58, 8.91, 81.41],
            [27.42, 36.89, 9.47, 1551.49, 8.37, 77.32],
            [27.14, 37.21, 10.06, 1566.11, 8.98, 80.82],
            [27.17, 37.21, 10.04, 1561.33, 8.93, 79.74]
        ],
        "High Load": [
            [28.04, 44.44, 16.40, 2028.32, 18.96, 78.57],
            [28.23, 45.89, 17.66, 1876.65, 18.88, 79.46],
            [28.62, 43.29, 14.67, 1958.46, 16.37, 79.84],
            [28.52, 42.02, 13.51, 1858.12, 14.30, 78.49],
            [28.14, 43.45, 15.32, 1820.07, 15.89, 79.74],
            [28.60, 40.94, 12.35, 2020.11, 14.21, 78.42],
            [28.16, 42.37, 14.22, 1933.06, 15.66, 78.80],
            [27.78, 40.99, 13.22, 1866.70, 14.06, 78.32],
            [28.69, 45.94, 17.25, 1875.79, 18.44, 78.70],
            [28.54, 41.87, 13.33, 1899.72, 14.43, 78.86]
        ]
    },
    "rack_5": {
        "Low Load": [
            [24.61, 31.99, 7.38, 1184.81, 4.98, 89.74],
            [24.67, 32.05, 7.38, 1198.31, 5.04, 89.64],
            [24.67, 31.89, 7.22, 1211.90, 4.99, 89.70],
            [24.53, 32.38, 7.85, 1205.20, 5.39, 88.12],
            [25.16, 31.60, 6.44, 1192.37, 4.37, 88.66],
            [24.45, 32.38, 7.93, 1202.04, 5.43, 88.88],
            [24.60, 32.05, 7.45, 1182.09, 5.02, 89.15],
            [24.63, 32.34, 7.71, 1195.17, 5.25, 88.25],
            [25.06, 31.61, 6.55, 1200.60, 4.48, 88.57],
            [24.62, 31.69, 7.07, 1195.42, 4.81, 89.71]
        ],
        "Medium Load": [
            [25.60, 34.91, 9.31, 1499.30, 7.95, 84.11],
            [26.21, 34.48, 8.27, 1483.25, 6.99, 84.40],
            [26.01, 34.35, 8.33, 1478.67, 7.02, 85.88],
            [26.14, 34.25, 8.10, 1501.09, 6.93, 85.36],
            [25.98, 34.36, 8.38, 1450.54, 6.93, 85.19],
            [26.33, 34.02, 7.69, 1498.94, 6.57, 84.42],
            [25.56, 34.91, 9.35, 1505.11, 8.01, 85.12],
            [25.70, 34.35, 8.64, 1473.78, 7.26, 85.25],
            [25.52, 34.50, 8.98, 1469.03, 7.51, 84.69],
            [25.54, 34.13, 8.59, 1513.73, 7.41, 85.42]
        ],
        "High Load": [
            [26.87, 38.75, 11.88, 1722.85, 11.66, 81.51],
            [26.74, 37.04, 10.30, 1650.25, 9.69, 81.57],
            [26.72, 37.96, 11.24, 1733.48, 11.10, 82.70],
            [26.72, 38.17, 11.45, 1733.25, 11.31, 82.31],
            [27.52, 37.83, 10.31, 1759.41, 10.33, 81.19],
            [27.46, 38.59, 11.13, 1798.64, 11.41, 81.51],
            [26.92, 38.75, 11.82, 1689.57, 11.38, 82.49],
            [27.44, 36.92, 9.47, 1762.01, 9.51, 82.58],
            [27.19, 38.30, 11.11, 1663.15, 10.53, 82.29],
            [27.02, 36.78, 9.76, 1751.50, 9.74, 81.16]
        ]
    },
    "rack_6": {
        "Low Load": [
            [24.77, 31.95, 7.18, 1199.36, 4.91, 89.85],
            [25.16, 32.23, 7.06, 1190.66, 4.79, 88.19],
            [25.08, 31.84, 6.76, 1202.94, 4.63, 89.77],
            [24.37, 32.15, 7.78, 1209.60, 5.37, 89.80],
            [24.77, 32.29, 7.52, 1201.51, 5.15, 89.60],
            [24.94, 31.87, 6.93, 1185.08, 4.68, 89.44],
            [24.39, 31.56, 7.17, 1211.10, 4.95, 88.49],
            [25.03, 31.64, 6.60, 1209.91, 4.55, 88.72],
            [25.15, 32.00, 6.85, 1204.42, 4.70, 89.82],
            [25.05, 32.10, 7.05, 1184.02, 4.76, 89.64]
        ],
        "Medium Load": [
            [25.70, 34.66, 8.96, 1506.10, 7.69, 84.43],
            [25.59, 34.63, 9.05, 1499.28, 7.73, 84.79],
            [25.75, 34.22, 8.47, 1513.97, 7.31, 85.67],
            [25.61, 34.36, 8.75, 1505.80, 7.51, 84.18],
            [26.18, 34.70, 8.52, 1512.97, 7.35, 84.55],
            [25.68, 34.83, 9.15, 1457.50, 7.60, 85.87],
            [26.20, 34.36, 8.16, 1446.30, 6.72, 85.56],
            [26.08, 34.77, 8.69, 1513.85, 7.49, 84.51],
            [25.98, 34.53, 8.55, 1448.50, 7.06, 84.83],
            [25.81, 34.18, 8.38, 1484.27, 7.08, 85.89]
        ],
        "High Load": [
            [26.66, 37.88, 11.22, 1710.99, 10.94, 82.67],
            [27.22, 37.90, 10.67, 1782.53, 10.84, 81.49],
            [27.16, 38.71, 11.56, 1647.18, 10.85, 82.24],
            [26.64, 38.65, 12.01, 1682.95, 11.52, 81.40],
            [26.95, 37.39, 10.45, 1736.61, 10.34, 82.72],
            [26.76, 37.22, 10.45, 1800.14, 10.72, 81.25],
            [27.41, 37.93, 10.52, 1730.46, 10.38, 82.37],
            [26.72, 38.12, 11.40, 1657.85, 10.77, 82.89],
            [27.36, 37.83, 10.47, 1813.65, 10.82, 81.18],
            [27.24, 37.85, 10.61, 1717.31, 10.38, 82.56]
        ]
    }
}

air_racks_7_8_9 = {
    "rack_7": {
        "Low Load": [
            [25.74, 33.04, 7.30, 1217.07, 5.06, 91.44],
            [25.82, 32.90, 7.08, 1234.94, 4.99, 92.12],
            [25.86, 33.34, 7.48, 1242.81, 5.30, 93.50],
            [26.38, 33.66, 7.27, 1229.89, 5.10, 92.45],
            [25.58, 33.59, 8.02, 1231.75, 5.63, 92.28],
            [25.83, 33.63, 7.80, 1249.68, 5.55, 90.30],
            [26.09, 33.27, 7.17, 1246.28, 5.09, 92.56],
            [25.66, 33.69, 8.04, 1249.38, 5.72, 92.90],
            [25.99, 33.24, 7.25, 1223.96, 5.06, 91.79],
            [25.47, 32.83, 7.36, 1218.42, 5.11, 92.44]
        ],
        "Medium Load": [
            [27.07, 35.64, 8.56, 1546.44, 7.55, 83.73],
            [27.20, 35.26, 8.06, 1581.47, 7.26, 83.75],
            [27.05, 36.04, 8.99, 1581.85, 8.10, 83.84],
            [27.07, 35.27, 8.20, 1570.50, 7.34, 82.14],
            [27.14, 36.06, 8.92, 1540.01, 7.83, 83.29],
            [27.32, 36.16, 8.85, 1548.60, 7.81, 82.11],
            [26.68, 35.71, 9.03, 1552.28, 7.99, 83.64],
            [27.37, 35.76, 8.39, 1567.88, 7.49, 83.80],
            [26.71, 35.45, 8.74, 1534.83, 7.65, 83.19],
            [26.80, 36.16, 9.37, 1529.06, 8.16, 83.90]
        ],
        "High Load": [
            [28.34, 42.42, 14.08, 1972.27, 15.82, 79.80],
            [28.42, 39.50, 11.08, 1813.72, 11.45, 79.21],
            [28.39, 41.83, 13.45, 1881.23, 14.41, 79.45],
            [28.55, 42.06, 13.51, 1954.34, 15.04, 78.76],
            [28.15, 42.21, 14.06, 2046.63, 16.40, 79.58],
            [27.84, 41.17, 13.33, 1841.31, 13.99, 79.40],
            [27.90, 39.93, 12.02, 1869.44, 12.81, 79.70],
            [28.05, 39.01, 10.96, 2025.93, 12.65, 79.53],
            [27.93, 39.85, 11.92, 2034.71, 13.83, 78.55],
            [28.26, 41.01, 12.74, 1947.01, 14.14, 79.84]
        ]
    },
    "rack_8": {
        "Low Load": [
            [25.16, 32.28, 7.11, 1195.75, 4.85, 88.34],
            [24.95, 31.95, 7.00, 1200.63, 4.79, 89.51],
            [25.10, 32.25, 7.15, 1198.21, 4.88, 88.17],
            [24.85, 31.79, 6.94, 1212.62, 4.79, 89.87],
            [25.08, 31.51, 6.43, 1213.76, 4.45, 88.14],
            [25.00, 31.59, 6.59, 1203.87, 4.52, 89.35],
            [25.12, 32.00, 6.88, 1211.89, 4.75, 88.13],
            [25.20, 32.34, 7.14, 1214.57, 4.94, 88.54],
            [24.95, 31.75, 6.80, 1191.69, 4.61, 88.21],
            [25.00, 31.99, 6.99, 1183.28, 4.71, 88.31]
        ],
        "Medium Load": [
            [26.14, 34.08, 7.94, 1474.63, 6.67, 84.70],
            [25.63, 34.27, 8.64, 1478.65, 7.28, 84.74],
            [26.08, 34.68, 8.60, 1510.35, 7.40, 84.54],
            [26.26, 34.06, 7.80, 1455.92, 6.47, 84.63],
            [25.66, 34.40, 8.74, 1500.09, 7.47, 85.40],
            [26.01, 34.12, 8.11, 1496.96, 6.91, 84.74],
            [25.95, 34.96, 9.02, 1488.07, 7.64, 85.49],
            [26.30, 34.11, 7.80, 1455.62, 6.47, 85.73],
            [25.48, 34.75, 9.26, 1496.69, 7.90, 85.23],
            [25.47, 34.62, 9.15, 1507.58, 7.86, 84.69]
        ],
        "High Load": [
            [27.07, 38.74, 11.66, 1673.90, 11.12, 81.74],
            [27.25, 37.34, 10.10, 1669.83, 9.61, 81.79],
            [26.89, 37.31, 10.42, 1723.06, 10.23, 81.44],
            [27.10, 37.17, 10.07, 1646.88, 9.45, 82.27],
            [27.11, 36.62, 9.51, 1787.32, 9.68, 82.39],
            [26.90, 38.59, 11.68, 1704.84, 11.35, 81.30],
            [27.07, 37.85, 10.77, 1718.45, 10.55, 81.63],
            [26.86, 36.63, 9.77, 1624.34, 9.05, 81.41],
            [26.72, 36.65, 9.94, 1699.63, 9.62, 81.19],
            [27.01, 38.27, 11.27, 1735.46, 11.14, 81.37]
        ]
    },
    "rack_9": {
        "Low Load": [
            [22.50, 30.11, 7.61, 1195.75, 5.18, 88.34],
            [22.87, 32.47, 9.61, 1200.63, 6.57, 89.51],
            [23.40, 32.70, 9.31, 1198.21, 6.35, 88.17],
            [23.62, 32.00, 8.38, 1212.62, 5.79, 89.87],
            [23.81, 30.17, 6.37, 1213.76, 4.40, 88.14],
            [22.89, 31.70, 8.81, 1203.87, 6.05, 89.35],
            [22.65, 32.32, 9.67, 1211.89, 6.68, 88.13],
            [22.07, 30.77, 8.70, 1214.57, 6.02, 88.54],
            [22.78, 30.13, 7.35, 1191.69, 4.99, 88.21],
            [22.99, 30.88, 7.89, 1183.28, 5.32, 88.31]
        ],
        "Medium Load": [
            [25.13, 35.18, 10.05, 1469.40, 8.41, 84.70],
            [26.32, 35.66, 9.34, 1463.88, 7.79, 84.74],
            [25.05, 34.31, 9.27, 1459.95, 7.71, 84.54],
            [26.28, 35.20, 8.92, 1467.28, 7.46, 84.63],
            [26.74, 35.08, 8.34, 1452.34, 6.90, 85.40],
            [25.84, 35.41, 9.58, 1469.77, 8.02, 84.74],
            [26.66, 34.62, 7.96, 1456.04, 6.61, 85.49],
            [26.25, 34.87, 8.63, 1455.07, 7.15, 85.73],
            [26.91, 35.37, 8.45, 1450.28, 6.99, 85.23],
            [25.73, 35.60, 9.87, 1453.88, 8.18, 84.69]
        ],
        "High Load": [
            [27.77, 37.27, 9.50, 1689.82, 9.15, 81.74],
            [27.81, 37.22, 9.41, 1687.32, 9.05, 81.79],
            [26.54, 38.78, 12.24, 1694.09, 11.82, 81.44],
            [26.05, 37.31, 11.26, 1681.14, 10.78, 82.27],
            [26.08, 37.30, 11.22, 1675.87, 10.72, 82.39],
            [26.78, 37.99, 11.21, 1674.18, 10.70, 81.30],
            [27.61, 37.81, 10.20, 1695.45, 9.86, 81.63],
            [27.47, 37.12, 9.65, 1687.01, 9.27, 81.41],
            [26.02, 37.08, 11.07, 1689.94, 10.66, 81.19],
            [27.94, 38.67, 10.73, 1682.38, 10.28, 81.37]
        ]
    }
}

for r_k, r_val in air_racks_7_8_9.items():
    air_raw[r_k] = r_val


# ==========================================
# 5. BUILD COMPLETE STRUCTURE
# Scenarios: "Low Load", "Medium Load", "High Load", "Normal Load" (alias of Low Load)
# ==========================================

RACK_IDS = [f"rack_{i}" for i in range(1, 10)]
SCENARIOS = ["Low Load", "Medium Load", "High Load"]

final_dataset = {}

for sc in SCENARIOS:
    final_dataset[sc] = {}
    for t_idx, t_str in enumerate(TIME_STEPS):
        det_list = []
        eff_list = []
        power_list = []
        liquid_list = []
        air_list = []
        for r_id in RACK_IDS:
            r_name = comp_details[r_id]["name"]
            d_item = comp_details[r_id][sc][t_idx]
            e_item = comp_efficiency[r_id][sc][t_idx]
            p_item = power_telemetry[r_id][sc][t_idx]
            l_row = liquid_raw[r_id][sc][t_idx]
            a_row = air_raw[r_id][sc][t_idx]
            
            det_list.append({
                "rackId": r_id,
                "rackName": r_name,
                "cpu": d_item["cpu"],
                "gpu": d_item["gpu"],
                "gpuMemory": d_item["gpuMemory"],
                "memory": d_item["memory"],
                "disk": d_item["disk"],
                "network": d_item["network"]
            })
            
            eff_list.append({
                "rackId": r_id,
                "rackName": r_name,
                "cpu": e_item["cpu"],
                "power": e_item["power"],
                "inletTemp": e_item["inletTemp"],
                "outletTemp": e_item["outletTemp"],
                "coolantFlow": e_item["coolantFlow"],
                "computingEff": e_item["computingEff"]
            })

            power_list.append({
                "rackId": r_id,
                "rackName": r_name,
                "activeServer": p_item["servers"],
                "activePower": p_item["activePower"],
                "avgPower": p_item["avgPower"],
                "peakPower": p_item["peakPower"],
                "capacity": p_item["capacity"],
                "utilization": p_item["utilization"]
            })

            liquid_list.append({
                "rackId": r_id,
                "rackName": r_name,
                "coolantInlet": l_row[0],
                "coolantOutlet": l_row[1],
                "deltaT": l_row[2],
                "coolantFlow": l_row[3],
                "heatRemoval": l_row[4],
                "coolingEff": l_row[5]
            })

            air_list.append({
                "rackId": r_id,
                "rackName": r_name,
                "hallSupply": a_row[0],
                "hallReturn": a_row[1],
                "deltaT": a_row[2],
                "airflow": a_row[3],
                "heatRemoval": a_row[4],
                "coolingEff": a_row[5]
            })
            
        final_dataset[sc][t_str] = {
            "time": int(t_str),
            "computingDetails": det_list,
            "computingEfficiency": eff_list,
            "power": power_list,
            "liquidCooling": liquid_list,
            "airCooling": air_list
        }

# Also map "Normal Load" to "Low Load"
final_dataset["Normal Load"] = final_dataset["Low Load"]

# Write to json file
output_path = "src/data/level5RackComparison.json"
with open(output_path, "w", encoding="utf-8") as f:
    json.dump(final_dataset, f, indent=2)

print("level5RackComparison.json successfully generated with all 5 telemetry datasets!")
