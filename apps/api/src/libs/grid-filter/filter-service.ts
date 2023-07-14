const { Op, literal } = require("sequelize");
// const userData = require("./userService");
let SETTING_TYPES = [
  "customDate",
  "applyDefaults",
  "checkDelete",
  "checkActive",
];

type settingsType = {
  customDate: string;
  applyDefaults: string;
  checkDelete: string;
  checkActive: string;
};

type check =
  | "string"
  | "boolean"
  | "number"
  | "date"
  | "array"
  | "function"
  | string;

const initFilters = (options: settingsType): any[] => {
  let init: any[] = [];
  //apply isactive filter
  if (options?.checkActive) {
    init.push({ active: 1 });
  }

  return init;
};

/**
 * @param {object} filterObj applied by user in front
 * @returns {array}
 */
exports.MakeFilter = (
  filterObj: any,
  settings: settingsType
): any[] | unknown => {
  try {
    let options = initFilters(settings);

    if (filterObj) {
      for (let key of Object.keys(filterObj)) {
        let check: check = typeof filterObj[key];
        if (filterObj[key] != null && typeof filterObj[key] == "object") {
          check = "dateRange";
          filterObj[key] = filterObj[key].value;
        }
        switch (check) {
          case "string":
            //handle keys with . in between
            if (key.indexOf(".") > -1) {
              options.push({
                [`$${key}$`]: { [Op.substring]: `%${filterObj[key]}%` },
              });
            } else {
              if (["fullName"].includes(key)) {
                options.push({
                  [Op.or]: [
                    {
                      firstName: { [Op.like]: `%${filterObj["fullName"]}%` },
                    },
                    {
                      middleName: { [Op.like]: `%${filterObj["fullName"]}%` },
                    },
                    {
                      lastName: { [Op.like]: `%${filterObj["fullName"]}%` },
                    },
                    {
                      membershipno: { [Op.like]: `%${filterObj["fullName"]}%` },
                    },
                    {
                      '$mainAddress.cityName$': { [Op.substring]: `${filterObj[key]}` },
                    }
                  
                  ],
                });
              } else {
                options.push({
                  [key]: { [Op.substring]: `%${filterObj[key]}%` },
                });
              }
            }
            break;
          case "boolean":
            options.push({
              [key]: filterObj[key],
            });
            break;

          case "date":
            if (settings && settings.customDate) {
              options.push({
                [Op.and]: [
                  literal(
                    `(CONVERT(DATE, ${settings.customDate}.${key})) = '${filterObj[key]}'`
                  ),
                ],
              });
            } else {
              options.push({
                [key]: new Date(filterObj[key]),
              });
            }

          case "array":
        
            break;
            case "dateRange":
              console.log('dateRange', key, filterObj[key])

              options.push({
                [key]: { [Op.between]: [filterObj[key][0], filterObj[key][1]] },
              });
            break;

          case "number":
            if (key.indexOf(".") > -1) {
              options.push({
                [`$${key}$`]: { [Op.like]: `%${filterObj[key]}%` },
              });
            } else {
              options.push({
                [key]: filterObj[key],
              });
            }
            break;

          default:
            break;
        }
      }
      return options;
    }
    return [];
  } catch (error: unknown) {
    return error;
  }
};
