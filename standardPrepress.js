if (app.documents.length > 0) {
  var myDocument = app.activeDocument;
} else {
  var myDocument = app.documents.add();
}

// Set inital page size
with(myDocument.documentPreferences) {
  pageHeight = '11in';
  pageWidth = '8.5in';
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