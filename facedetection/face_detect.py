import cv2
import sys
import os

cascPath = "haarcascade_frontalface_default.xml"
directory = r'C:\Users\Annie Davies\AppData\Local\Programs\Python\Python39\happyorsad\facedetection\images'

for filename in os.listdir(directory):
    print(os.listdir)
    # Get user supplied values
    imagePath = os.path.join(directory, filename)
    #imagePath = sys.argv[1]
    
    # Create the haar cascade
    os.chdir(r'C:\Users\Annie Davies\AppData\Local\Programs\Python\Python39\happyorsad\facedetection')
    faceCascade = cv2.CascadeClassifier(cascPath)
    os.chdir(directory)

    # Read the image
    image = cv2.imread(imagePath)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Detect faces in the image
    faces = faceCascade.detectMultiScale(
        gray,
        scaleFactor=1.1,
        minNeighbors=5,
        minSize=(30, 30),
        flags = cv2.CASCADE_SCALE_IMAGE
    )

    print("Found {0} faces!".format(len(faces)))

    # Draw a rectangle around the faces
    for (x, y, w, h) in faces:
        cv2.rectangle(image, (x, y), (x+w, y+h), (0, 255, 0), 2)

    cv2.imshow("Faces found", image)
    #cv2.waitKey(0)

    #now to loop through and crop images!!!!!
    saved_location = os.path.join('cropped', filename + ".png")
    img = cv2.imread(imagePath)
    crop_img = img[y: y+max(w,h), x: x+max(w,h)]
    cv2.imshow("cropped", crop_img)
    
    resized = cv2.resize(crop_img, (76, 76), interpolation = cv2.INTER_AREA)
    cv2.imshow("Resized image", resized)

    outputDir = r'C:\Users\Annie Davies\AppData\Local\Programs\Python\Python39\happyorsad\facedetection\faces'
    os.chdir(outputDir)
    cv2.imwrite(filename, resized)
    os.chdir(directory)
    #cv2.waitKey(0)