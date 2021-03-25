# Eruza 
Eruza -  Waste Automation & Management System is a digital solution that aims to automate the end to end process of plastic bottle collection and impact report generation with  details like event ID, event location, benefited people count, delivered product list, photos of the bills, the digitized content of the bill, photos of the event, financial & funding details, etc

## Repo Details

High level directory structure for this repository:

```bash
├── frontend                  <- A progressive web app, connected with Azure resources via Azure SDK for JavaScrip
├── azure                     <- Azure related code
│   ├── AzureResourceGroup    <- ARM template for the solution in Azure.
│   ├── iotedge               <- IoT Edge project with camera capture module and custom vision module
├── images                    <- Images used in the documentation
```


### Dependencies
1. [Azure Account](https://portal.azure.com) 
2. 

# Technical Overview
We have used the Custom Vision Service for object detection. Object detection is useful to detect plastic bottles and count them.  Then we have used Optical Character Recognition (OCR) for converting the image of the receipt into digital text.  We have created our application as a progressive web app (More details are given below). Azure Blob container is used as a database to store the images of plastic bottles, receipts and event images. Storage tables are used for storing the event details, stats about collected bottles, product lists, digitized content of the receipt, etc. We also took advantage of Azure IoT Edge, Azure IoT Central, and used devices like Raspberry Pi as well. More detailed content is discussed below.

## Azure Cognitive Services
Azure Cognitive Services is a family of cloud-based services that includes REST APIs and Client library SDKs that can embed cognitive intelligence into the application with ease. The categories of cognitive services include vision, speech, language, decision, and search. Thus, They can help the application to see, hear, speak, understand and assess the situation to be decisive, as accurately as possible.

We have relied on one of the core capabilities of Azure Cognitive Service called custom vision service to build an object detector model. We have also involved other APIs like Speech API to make the process simple.

### Object Detection Model

To utilize the Custom Vision Service, we have created Custom Vision Training and Prediction resources in Azure.

During the project creation, We have chosen Custom Vision Service Resource as the resource group and  Object Detection as the Project type. Once the project is created, we have the collection of images that varies by parameters like size, background, etc ready, thus we added the images to the training images workspace and tagged each one of them appropriately to help the recognition learning of the detector. The process was repeated for the next set of images.

#### Training Details
The current images and their tags are utilized by the detector to create the object detection model that identifies each tagged object as accurately as possible. The training process can be witnessed in the performance tab once the train button is clicked.

#### Evaluation Details
The performance of the model can be calculated after the completion of training.  The Custom Vision Service has calculated the precision, recall, and mean average precision using the images submitted by us. On the left pane of the performance tab, We have set the probability threshold slider as 65 % that acts as the prediction threshold. The Overlap Threshold helps us to set the minimum allowed overlap between the predicted object bounding box and the actual user-entered bounding box.

### Optical Character Recognition
We have utilized the Optical Character Recognition (OCR) capabilities of the Computer Vision API to recognize and extract the text from the images of the receipts. In particular, We have used the Computer Vision Read API of the OCR technology to extract the printed text. The Read API gave us the capability to extract text from multiple languages,  handwritten texts, and other contents like digits & currency symbols with ease. Even, We are able to handle the scenarios involving text-heavy images, multi-page pdf documents, images containing both printed & handwritten text with ease by utilizing the capabilities of reading API.

To build the model, we have loaded the input of a receipt and made a post request to Read API. This call returns a response with the header field Operation-Location. We have extracted the operation ID from the Operation-Location URL. Then we made a get request to the Computer Vision API with the operation ID. This get request gave us a JSON response with the status field. We executed this get operation multiple times until we get the succeeded status. Once the status is with succeeded value, We found that the JSON response holds the extracted content from the image. We also can see that the extracted text line contains all extracted words with their coordinates and confidential scores.

## Web App (Volunteer App)
We have built our web app as a progressive web app using React & typescript. We relied on Azure SDK for javascript to build our application. A progressive web app stands between mobile websites and mobile apps. It gives a mobile app-like experience to the users still being a website. Users can save the progressive web app on their home screen just like a native app. One big advantage of progressive web app is their platform and device agnosticism. That is, the app can be used seamlessly irrespective of the platform they rely on. You can see more details about the front end [here]( https://github.com/SaraOlsson/eruza-waste-cleanup/tree/main/frontend)

## Screenshots

## Enhancements

## Demo 
