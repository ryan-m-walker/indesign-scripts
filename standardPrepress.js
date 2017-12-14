
var myDialog = app.dialogs.add({
  name: 'Prepress Options'
})

var mainCol = myDialog.dialogColumns.add();
// Document Title
  var titleBorderPanel = mainCol.borderPanels.add();
    var titleLabelCol = titleBorderPanel.dialogColumns.add();
      var titleLabel = titleLabelCol.staticTexts.add({staticLabel: 'Document Title'});
    var titleInputCol = titleBorderPanel.dialogColumns.add();
    // Input Variable
      var titleInput = titleInputCol.textEditboxes.add({ minWidth: 250 })

  // Dimension Column
  var dimensionsBorderPanel = mainCol.borderPanels.add();
    // Document Width
    var widthLabelCol = dimensionsBorderPanel.dialogColumns.add();
      var widthLabel = widthLabelCol.staticTexts.add({staticLabel: 'Width'});
    var widthInputCol = dimensionsBorderPanel.dialogColumns.add();
      // Input Variable
      var widthInput = widthInputCol.textEditboxes.add({
        editContents: '8.5in', 
        minWidth: 100 
      })

    // Document Height 
    var heightLabelCol = dimensionsBorderPanel.dialogColumns.add();
      var heightLabel = heightLabelCol.staticTexts.add({ staticLabel: 'Height' });
    var heightInputCol = dimensionsBorderPanel.dialogColumns.add();
    // Input Variable
      var heightInput = heightInputCol.textEditboxes.add({ 
        editContents: '11in',
        minWidth: 100 
      })

/*
myDialog = {
  mainCol: {
    titleBorderPanel
  }
}

*/

var myResult = myDialog.show();

if (myResult === true) {

  // Grab User Input from dialog
  var documentName = titleInput.editContents;
  var documentWidth = widthInput.editContents;
  var documentHeight = heightInput.editContents;


  if (app.documents.length > 0) {
    var myDocument = app.activeDocument;
  } else {
    var myDocument = app.documents.add({
      name: documentName
    });
  }

  with(myDocument.viewPreferences) {
    horizontalMeasurementUnits = MeasurementUnits.inches;
    verticalMeasurementUnits = MeasurementUnits.inches;
  }



  // Set inital page size
  with(myDocument.documentPreferences) {
    pageHeight = documentHeight;
    pageWidth = documentWidth;
    pageOrientation = PageOrientation.landscape;
    pagesPerDocument = 2;
  }

  // Make transparency layer
  try {
    var myLayer = myDocument.layers.add({
      name: 'Transparency Overlay'
    });
  } catch(err) {
    var myLayer = myDocument.layers.itemByName('Transparency Overlay');
  }


  with(myDocument.viewPreferences) {
    rulerOrigin = RulerOrigin.pageOrigin;
    horizontalMeasurementUnit = MeasurementUnits.inches;
    verticalMeasurementUnits = MeasurementUnits.inches;
  }

  var masterSpread = myDocument.masterSpreads.item(0);
    var leftMasterSpread = masterSpread.pages.item(0);
      var leftOverlay = leftMasterSpread.rectangles.add(myLayer);
        with(leftOverlay) {
          geometricBounds = ['0in', '0in', '8.5in', '11in'];
          fillColor = "Paper";
          transparencySettings.blendingSettings.blendMode = BlendMode.MULTIPLY;
        }   
    var rightMasterSpread = masterSpread.pages.item(1);
      var rightOverlay = rightMasterSpread.rectangles.add();
        with(rightOverlay) {
          geometricBounds = ['0in', '0in', '8.5in', '11in'];
          fillColor = "Paper";
          transparencySettings.blendingSettings.blendMode = BlendMode.MULTIPLY;
        }


  // Create the Transparency Flattener Preset if it doesn't already exist
  if (!app.flattenerPresets.itemByName('Standard Prepress')) {
    app.flattenerPresets.add({
      name: 'Standard Prepress',
      convertAllTextToOutlines: true,
      rasterVectorBalance: 100,
      lineArtAndTextResolution: 1200,
      gradientAndMeshResolution: 300,
    });
  } 

  // var myPages = myDoc.pages;

  // for (var i = 0; i < myPages.length; i++) {
  //   var currentPage = myPages.item(i);
  //   var myTextFrame = currentPage.textFrames.add();
  //   myTextFrame.contents = 'Hello World ' + i;
  // }


  myLayer.locked = true;

}

myDialog.destroy();