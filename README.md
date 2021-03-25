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

## Screenshots

## Enhancements

## Demo 
