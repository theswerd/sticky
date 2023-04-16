import base64
import io
from flask_cors import CORS, cross_origin
import flask

from binascii import a2b_base64
import numpy as np
import cv2
from segment_anything import SamPredictor, sam_model_registry
import matplotlib
import matplotlib.pyplot as plt
plt.figure(figsize=(10, 10))




sam = sam_model_registry["vit_h"](checkpoint="sam_vit_h_4b8939.pth")
# sam.to(device='mps')
predictor = SamPredictor(sam)

app = flask.Flask(__name__)

CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


# def dataUriToImage(dataUri: str) -> Image:
#     data = dataUri.split(",")[1]
#     data = a2b_base64(data)
#     image = Image.open(io.BytesIO(data))
#     image = image.convert("RGB")
#     image = image.resize((512, 512))
#     return image


def readb64(uri) -> cv2.imread:
    encoded_data = uri.split(',')[1]
    # nparr = np.fromstring(base64.b64decode(encoded_data), np.uint16)
    based = base64.b64decode(encoded_data)
    based = np.frombuffer(based, np.uint8)
    img = cv2.imdecode(based, cv2.IMREAD_COLOR)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    return img

def toDataUri(image: np.ndarray) -> str:
    # add alpha channel
    image = cv2.cvtColor(image, cv2.COLOR_RGB2RGBA)
    # 
    
    retval, buffer = cv2.imencode('.png', image)
    png_as_text = base64.b64encode(buffer)
    return "data:image/png;base64," + png_as_text.decode("utf-8")


@app.route("/", methods=["POST"])
@cross_origin()
def index():
    print("request received")
    data = flask.request.get_json()
    image = readb64(data["image"])
    positionX = data["positionX"]
    positionY = data["positionY"]
    positionX = float(positionX)
    positionY = float(positionY)
    print("request parsed")
    # clear predictor
    predictor.set_image(image)
    print("image inserted")


    input_point = np.array([[float(image.shape[0] * positionX), float(image.shape[1] * positionY) ]])
    input_label = np.array([1])
    mask, scores, logits = predictor.predict(
        point_coords=input_point,
        point_labels=input_label,
        multimask_output=False,
    )
    print("mask generated")
    
    # clear figure
    plt.clf()
    # plot the image
    image = image[...,::-1]


    

    # combine all 3 masks or 
   
    # generate png where the mask is applied to the image
    maskedImage = image * mask[0][..., None]

    print(maskedImage.shape)

    zeroRGBA = np.zeros((maskedImage.shape[0], maskedImage.shape[1], 4), dtype=np.uint8)
    zeroRGBA[..., 0:3] = maskedImage
    zeroRGBA[..., 3] = mask[0] * 255



    plt.imsave("test1.png", maskedImage)
    plt.imsave("test2.png", zeroRGBA)
    plt.imsave("test3.png", mask[0])
    

    # image to png
    # image.save("test.png")

    print("logs generated")
    print("returning response")
    # flask.response.headers.add('Access-Control-Allow-Origin', '*')
    return flask.jsonify({
        "image": toDataUri(zeroRGBA),
    })

   

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
