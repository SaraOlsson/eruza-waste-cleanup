# Eruza 
Eruza -  Waste Automation & Management System is a digital solution that aims to automate the end to end process of plastic bottle collection and impact report generation with  details like event ID, event location, Benefited people count, delivered product list, Photos of the bills, the content of the bill, photos of the event, financial & funding details, etc

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


# Overview

We have used the Custom Vision Service for object detection. Object detection is useful to detect plastic bottles and count them.  Then we have used Optical Character Recognition (OCR) for converting the image of the receipt into digital text.  We have created our application as a progressive web app (More details are given below). Azure Blob container is used as a database to store the images of plastic bottles, receipts and event images. Storage tables are used for storing the event details, stats about collected bottles, product lists, digitized content of the receipt, etc. We also took advantage of Azure IoT Edge, Azure IoT Central, and used devices like Raspberry Pi as well. More detailed content is discussed below.

## Project Plan

## Instructions

## Screenshots

## Enhancements

## Demo 
