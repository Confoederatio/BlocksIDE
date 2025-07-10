//Intialise functions
{
  function getMissingProvinceIDs (arg0_file_path) {
    //Convert from parameters
    var file_path = arg0_file_path;

    //Declare local instance variables
    var file_content = fs.readFileSync(file_path, "utf-8");
      file_content = file_content.replace(/(\w+):/g, '"$1":').replace(/,(\s*])/, '$1')
      .replace(/"Age_of_History":\s*Data,/, '"Age_of_History": "Data",');;
    var map_obj = JSON.parse(file_content);
    var missing_province_ids = [];

    //Get missing province IDs
    var actual_province_id_array = [];
    var number_of_provinces = map_obj.Data.length;
    var province_id_array = [];

    for (var i = 0; i < map_obj.Data.length; i++)
      actual_province_id_array.push(map_obj.Data[i].iProvinceID);
    for (var i = 0; i < map_obj.Data.length; i++)
      province_id_array.push(i);

    //Filter out missing elements already in array
    missing_province_ids = province_id_array.filter((number) => (!actual_province_id_array.includes(number)));

    //Return statement
    return missing_province_ids;
  }

  function getNumberOfProvinces (arg0_file_path) {
    //Convert from parameters
    var file_path = arg0_file_path;

    //Declare local instance variables
    var file_content = fs.readFileSync(file_path, "utf-8");
      file_content = file_content.replace(/(\w+):/g, '"$1":').replace(/,(\s*])/, '$1')
      .replace(/"Age_of_History":\s*Data,/, '"Age_of_History": "Data",');;
    var map_obj = JSON.parse(file_content);
    var missing_province_ids = [];
    var number_of_provinces = map_obj.Data.length;

    return number_of_provinces;
  }

  function writeProvincesToFile (arg0_file_path) {
    //Convert from parameters
    var file_path = arg0_file_path;

    //Declare local instance variables
    var file_content = fs.readFileSync(file_path, "utf-8");
      file_content = file_content.replace(/(\w+):/g, '"$1":').replace(/,(\s*])/, '$1')
      .replace(/"Age_of_History":\s*Data,/, '"Age_of_History": "Data",');;
    var map_obj = JSON.parse(file_content);
    var missing_province_ids = [];
    var new_map_obj = {
      Data: []
    };

    //Push to Data
    for (var i = 0; i < map_obj.Data.length; i++) {
      //console.log(map_obj.Data[i])
      new_map_obj.Data[i] = {
        pX: map_obj.Data[i].lPointsX,
        pY: map_obj.Data[i].lPointsY
      };
    }

    var output_string = `{\nAge_of_History: Data,\nData: ` + JSON.stringify(new_map_obj.Data).replace(/"(\w+)"\s*:/g, '$1:') + "\n}";
    fs.writeFileSync("output.txt", output_string);

    //Return statement
    return missing_province_ids;
  }
}
