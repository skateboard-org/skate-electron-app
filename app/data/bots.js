export default [
  {
    name: '@define',
    title: 'Dictionary',
    icon: '',
    desc: 'serves you with definitions',
    url: '',
    returnType: 'ListOfText',
    parameterEnabled: true,
    inputParameter: 'word',
    parameterDesc: 'the term you want to get a definition for',
    typeAheadEnabled: true,
    typeAheadUrl: '',

    type: 'cloud',
    typeAheadSource: 'url',
    typeAheadOptions: []
  },
  {
    name: '@image',
    title: 'Images',
    icon: '',
    desc: 'serves you with pictures',
    url: '',
    returnType: 'ListOfImages',
    parameterEnabled: true,
    inputParameter: 'seach term',
    parameterDesc: 'the term you want to get pictures',
    typeAheadEnabled: true,
    typeAheadUrl: '',

    type: 'cloud',
    typeAheadSource: 'url',
    typeAheadOptions: []
  },
  {
    name: '@calc',
    title: 'Calculator',
    icon: '',
    desc: 'evaluates maths',
    url: '',
    returnType: 'ListOfText',
    parameterEnabled: true,
    inputParameter: 'expression',
    parameterDesc: 'the expression you want to evaluate',
    typeAheadEnabled: false,
    typeAheadUrl: '',

    type: 'terminal',
    typeAheadSource: 'url',
    typeAheadOptions: []
  },
  {
    name: '@mac',
    title: 'Mac Controls',
    icon: '',
    desc: 'control your mac',
    url: '',
    returnType: 'Task',
    parameterEnabled: true,
    inputParameter: 'expression',
    parameterDesc: 'controls for mac',
    typeAheadEnabled: true,
    typeAheadUrl: '',

    type: 'terminal',
    typeAheadSource: 'static',
    typeAheadOptions: ['sleep', 'sound']
  },
  {
    name: '@giphy',
    title: 'Search for GIFs',
    icon: '',
    desc: 'get gifs wherever you need them',
    url: '',
    returnType: 'ListOfImages',
    parameterEnabled: true,
    inputParameter: 'searchterm',
    parameterDesc: 'search term',
    typeAheadEnabled: false,
    typeAheadUrl: '',

    type: 'cloud',
    typeAheadSource: '',
    typeAheadOptions: []
  }
];

// export class Bot implements BotType {
//   name: string;

//   title: string;

//   icon: string;

//   desc: string;

//   url: string;

//   returnType: string;

//   parameterEnabled: string;

//   inputParameter: string;

//   parameterDesc: string;

//   typeAheadEnabled: boolean;

//   typeAheadUrl: string;

//   constructor(name: string) {
//     this.name = name;
//   }
// }
