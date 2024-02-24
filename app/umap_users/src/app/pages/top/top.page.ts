import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
const mojs = require('@mojs/core');

@Component({
  selector: 'app-top',
  templateUrl: './top.page.html',
  styleUrls: ['./top.page.scss'],
})
export class TopPage implements OnInit {
  userNickname: string = '';
  ageGroups = [
    { label: '乳児', value: 'infant' },
    { label: '幼児', value: 'toddler' },
    { label: '小学生', value: 'earlyElementary' },
  ];
  selectedAgeGroup: { label: string; value: string } = this.ageGroups[0];

  constructor(
    private storage: Storage,
    private router: Router
  ) { }

  ngOnInit() {
    this.initializeMojsShapes();
    this.init();
  }

  fixAgeGroupLabel = (
    ageGroup: { label: string; value: string } | undefined
  ): { label: string; value: string } => {
    if (typeof ageGroup === 'undefined') {
      return this.ageGroups[0];
    }
    else {
      return ageGroup;
    }
  }

  async init() {
    await this.storage.create();
    console.log(this.storage.get('userNickname'));
    this.storage.get('ageGroup').then((val) => {
      if (val) {
        const ageGroup: { label: string; value: string } | undefined = this.ageGroups.find((ageGroup) => ageGroup.value === val);
        this.selectedAgeGroup = this.fixAgeGroupLabel(ageGroup);
      }
    });
    this.storage.get('userNickname').then((val) => {
      if (val) {
        this.userNickname = val;
      }
    });
  }

  selectAgeGroup(ageGroup: { label: string; value: string }) {
    this.selectedAgeGroup = ageGroup;
  }

  async registerUser() {
    await this.storage.set('userNickname', this.userNickname);
    await this.storage.set('ageGroup', this.selectedAgeGroup.value);
    // Navigate to the home page after registration
    this.router.navigate(['/home']);
  }

  login = () => {

  }
  
  private initializeMojsShapes() {
    const COLORS = {
      white:   '#ffffff',
      black:   '#000000',
      green:   '#49F2CC',
      lightGrey: '#777',
      grey:    '#29363B',
      cyan:    'cyan',
      yellow:  '#FFE202',
      hotpink: 'deeppink',
    };
    
    // ADD CUSTOM SHAPES
    class M extends mojs.CustomShape {
      getShape () {
        return '<path d="M11.0001 35.7999C14.9501 30.6999 15.6001 21.8999 15.6001 15.6999V11.0499H11.3001V8.1499H17.1501V0.499901H20.3501V8.1499H26.4001V10.8499C27.9001 7.4999 28.9001 3.7499 29.6001 0.399902L32.7501 1.3499C32.4001 3.1499 32.0001 5.0999 31.3501 6.8999H43.0001V9.7999H30.3501C29.5001 12.0499 28.2501 14.3499 27.0001 16.3999L24.8501 13.7499C25.4001 12.8999 25.8501 11.9999 26.3001 11.0499H18.7001V16.3999H25.5001C25.4501 20.5999 25.3001 24.7499 25.0501 28.8999C25.0501 29.0999 25.0001 29.3999 25.0001 29.5499C24.8501 31.4499 24.7001 33.3499 24.3501 35.1999C23.9501 37.1999 23.0501 38.4499 20.8501 38.4499C19.6501 38.4499 18.5001 38.3499 17.3501 38.0999L16.6501 34.7499C17.7501 35.0499 18.9001 35.3499 19.9501 35.3499C21.0001 35.3499 21.2001 34.5999 21.4501 33.6499C21.7501 32.6999 21.8001 31.2999 21.9001 30.1499C21.9001 29.8499 21.9501 29.5499 21.9501 29.2499C22.2001 25.9499 22.2501 22.6499 22.3501 19.2999H18.6001C18.3001 25.4499 17.0001 33.4499 13.1501 38.4499L11.0001 35.7999ZM8.3001 12.4999C6.3501 9.7499 4.3001 7.1499 1.8501 4.8999L4.2001 2.5999C6.7001 4.8499 8.9501 7.3499 10.9501 10.0499L8.4001 12.4999H8.3001ZM27.8001 34.7999C29.2501 35.1999 30.6501 35.4499 32.1001 35.4499C32.9501 35.4499 33.2501 34.8499 33.2501 33.9999V27.6499H26.4001V24.6499H33.1001V20.0999C34.4501 19.2499 35.6501 18.2499 36.7501 17.0999H28.7501V14.2999H39.7001L41.3501 16.3499C39.7001 17.9999 38.0001 19.5499 36.2001 20.9999V24.6499H43.2001V27.6499H36.3501V35.3999C36.3501 37.5499 35.2501 38.5999 33.0001 38.5999C31.4001 38.5999 29.8501 38.4999 28.2501 38.1499L27.8001 34.7999ZM9.9001 36.7499C10.9001 38.0999 12.0501 39.1999 13.5501 39.8999C16.3501 41.2499 22.0001 41.3499 25.1001 41.3499C31.2501 41.3499 37.4001 40.9999 43.5501 40.6499C43.0501 41.8499 42.7501 43.0499 42.5001 44.3999H40.9501C36.4001 44.3999 31.5001 44.7499 26.9501 44.7499C23.2501 44.7499 17.7001 44.6499 14.1501 43.5499C11.8001 42.8499 10.1001 41.6499 8.7501 39.5999L8.6501 39.6999C6.6501 41.6999 4.9501 43.9499 2.8001 45.8499L0.850098 42.2499C3.0001 40.8999 4.9001 39.3499 6.6501 37.6999V23.9499H0.900098V20.6999H9.9501V36.7499H9.9001Z" fill="black"/>';
      }
    }
    mojs.addShape('m', M);
    
    class O extends mojs.CustomShape {
      getShape () {
        return '<path d="M29.4 40.05C24.75 36.6 22.15 35.2 19.25 34C19.1 39.5 16.9 42.15 11.6 42.15C6.15 42.15 0.8 38.9 2.65 33.4C3.45 31.1 5.95 29.55 9.55 29.1C11.35 28.85 13.3 28.85 15.6 29.3V20.55H3.25V17.15H15.6V9.6H2.6V6.15H15.6V0.199998H19.25V6.15H30.9V9.6H19.25V17.15H30.15V20.55H19.25V30.35C24.3 32.05 27.9 34.55 31.6 37.2L29.4 40.05ZM15.6 33.2C13.6 32.75 11.35 32.7 10.05 32.9C8.5 33.1 6.6 33.85 6.3 35.25C5.8 37.35 9 38.6 11.6 38.6C15.25 38.6 15.65 36.8 15.6 33.2Z" fill="black"/>';
      }
    }
    mojs.addShape('o', O);

    class J extends mojs.CustomShape {
      getShape () {
        return '<path d="M15.8 0.899998C23.7 0.899998 28.65 4.55 28.4 11.6C28.2 16.85 22.95 24.3 11.2 24.3H8.25V20.6H11.2C16.65 20.6 24.3 17.75 24.55 11.5C24.75 6.1 21.05 4.55 15.8 4.55H0.800001V0.899998H15.8Z" fill="black"/>';
      }
    }
    mojs.addShape('j', J);
    
    class S extends mojs.CustomShape {
      getShape () {
        return '<path d="M22.3999 21.2501C32.0999 20.3501 38.5999 26.9001 39.3499 35.9501H35.7999C35.2499 29.6501 31.5499 25.1501 24.4999 24.4501C27.8499 29.8501 27.95 34.0001 25.45 36.8501C22.05 41.0001 16.4999 40.2501 10.6499 38.9501L11.3999 35.8501C17.9999 37.2501 20.8499 36.8001 22.5999 34.7501C25.1999 31.4501 21.6999 26.5501 20.3499 24.6501C12.9499 25.9001 7.34993 31.5501 3.39993 35.9501L0.949951 33.4001C5.14995 28.9001 10.9499 23.4501 18.4999 21.7501C17.9499 20.8001 15.7499 17.6501 15.7499 17.6501C12.2999 12.7501 14.0499 8.6501 19.3999 6.6001L14.45 2.8001L16.5999 0.100098L28.95 9.7001L26.8499 12.4001L22.2499 8.8501C17.0499 10.5501 16.6999 12.7501 18.7499 15.9001L22.3999 21.2501ZM39.8999 16.0501C39.8999 18.9501 37.4999 21.2501 34.5999 21.2501C31.6499 21.2501 29.2 19.0001 29.2 16.0501C29.2 13.1501 31.6499 10.7001 34.5999 10.7001C37.4499 10.7001 39.8999 13.1501 39.8999 16.0501ZM37.7999 16.0501C37.7999 14.3501 36.1999 12.8501 34.5999 12.8501C32.8999 12.8501 31.3999 14.3001 31.3999 16.0501C31.3999 17.8001 32.8999 19.2001 34.5999 19.2001C36.2499 19.2001 37.7999 17.8001 37.7999 16.0501Z" fill="black"/>';
      }
    }
    mojs.addShape('s', S);

    // VARIABLES
    const {approximate} = mojs.easing,
    shiftCurve = approximate(mojs.easing.path( 'M0,100 C50,100 50,100 50,50 C50,0 50,0 100,0' )),
    scaleCurve = approximate(mojs.easing.path( 'M0,100 C21.3776817,95.8051376 50,77.3262711 50,-700 C50,80.1708527 76.6222458,93.9449005 100,100' )),
    charSize = 25,
    leftStep = 46.9,
    logo     = '#script-logo';

    const CHAR_OPTS = {
      parent:       logo,
      isForce3d:    true,
    }

    const CHAR_HIDE_THEN = {}

    // HELPERS
    const scale = function (curve: (arg0: any) => number, n: number) {
      return (p: any) => { return n*curve(p); }
    }
    const increase = function (curve: { (p: any): number; (arg0: any): any; }, n: number) {
      return (p: any) => { return n + curve(p); }
    }

    // CURVES
    const scaleC = approximate( increase( scaleCurve, 1 ) ),
      scaledCurve = ( amount: number ) => {
        return increase( scale( scaleCurve, amount ), 1 );
      },
      scaleCShort = approximate( scaledCurve(.75) );


    // SHAPES
    const mCharacter = new mojs.Shape({
      ...CHAR_OPTS,
      shape:    'm',
      left:     leftStep + 'px',
      x:        10,  // Set for last position
      y:        { [350] : 150, easing: shiftCurve },
      scaleY:   { 1 : 1, curve: scaleCShort },
      origin:   { '50% 100%' : '50% 0%', easing: shiftCurve },
      delay:    232,
      duration: 680,
    }).then({
      delay:   115,
      y:       { to: 0, easing: shiftCurve },  // Set for last position
      scaleY:  { 1: 1, curve: approximate( scaledCurve(.5) ) },
      origin: { '50% 100%' : '50% 0%', easing: shiftCurve }
    }).then(CHAR_HIDE_THEN).play();

    const oCharacter = new mojs.Shape({
      ...CHAR_OPTS, 
      shape:        'o',
      fill:         'none',
      left:         2*leftStep + 'px',
      delay:        350,
      duration:     465,
      strokeWidth:  3,
      x:            200,
      y:            { [-100] : 250, easing: shiftCurve },
      scaleY:       { 1: 1, curve: scaleC },
      origin:       { '50% 0%' : '50% 100%', easing: shiftCurve }
    }).then({
      duration:     407,
      x:            { to: 18, easing: shiftCurve },  // Set for last position
      scaleX:       { 1: 1, curve: scaleCShort },
      origin:       { '100% 50%' : '0% 50%', easing: shiftCurve }
    }).then({
      duration:     700,
      y:            { to: 2 + 'px', easing: shiftCurve },  // Set for last position
      scaleY:       { 1: 1, curve: scaleCShort },
      origin:       { '50% 100%' : '50% 0%', easing: shiftCurve }
    }).then(CHAR_HIDE_THEN).play();

    const jCharacter = new mojs.Shape({
      ...CHAR_OPTS,
      shape:      'j',
      top:        23 + 'px',
      left:       3*leftStep + 'px',
      delay:      40,
      duration:   580,
      x:         -200,
      y:          { [250] : -100, easing: shiftCurve },
      scaleY:     { 1: 1, curve: scaleC },
      origin:     { '50% 100%' : '50% 0%', easing: shiftCurve }
    })
    .then({
      duration:   523,
      x:          { to: 10, easing: shiftCurve },  // Set for last position
      scaleX:     { 1: 1, curve: scaleCShort },
      origin:     { '0% 50%' : '100% 50%', easing: shiftCurve }
    })
    .then({
      y:          { to: 20 + 'px', easing: shiftCurve },  // Set for last position
      scaleY:     { 1: 1, curve:  approximate( scaledCurve(.5) ) },
      origin:     { '50% 0%' : '50% 100%', easing: shiftCurve }
    }).then(CHAR_HIDE_THEN).play();

    const sCharacter = new mojs.Shape({
      ...CHAR_OPTS,
      shape:      's',
      left:       4*leftStep + 'px',
      delay:      116,
      duration:   523,
      x:          { 500: -5, easing: shiftCurve },
      y:          200,
      scaleX:     { 1: 1, curve: scaleC },
      origin:     { '100% 50%' : '0% 100%', easing: shiftCurve }
    })
    .then({
      delay:      116,
      y:          { to: 3 + 'px', easing: shiftCurve },  // Set for last position
      scaleY:     { 1: 1, curve: scaleCShort },
      origin:     { '50% 100%' : '50% 0%', easing: shiftCurve }
    }).then({ ...CHAR_HIDE_THEN, delay: 1280 }).play();

    // LINES
    let LINE_OPTS = {
      shape:        'line',
      strokeWidth:  { 10: 0 },
      stroke:       COLORS.cyan,
      radius:       98,
      parent:       logo,
      angle:        90,
      duration:     465,
      delay:        495,
      radiusY:      0,
      strokeDasharray: '100% 100%',
      strokeDashoffset: { '100%': '-100%' },
      x: -7,
    };

    let line1 = new mojs.Shape({
      ...LINE_OPTS,
      x:  189,
      y:  { [-20] : 160 },
    }).play();

    let line2 = new mojs.Shape({
      ...LINE_OPTS,
      x: -175,
      y: { 200 : -20 },
      stroke: COLORS.hotpink,
      strokeDashoffset: { '-100%' : '100%' },
      delay: 290
    }).play();

    let line3 = new mojs.Shape({
      ...LINE_OPTS,
      y: 30,
      stroke: COLORS.yellow,
      strokeDashoffset: { '-100%': '100%' },
      delay: 804,
      angle: 0
    }).play();

    let StaggerShape = new mojs.stagger( mojs.Shape );

    let underlines = new StaggerShape({
      ...LINE_OPTS,
      angle:  0,
      radiusY: 0,
      y: 2 + 'px',
      strokeWidth: 2,
      stroke: [ COLORS.hotpink, COLORS.yellow, COLORS.cyan, COLORS.black ],
      duration: 581,
      delay: 'stagger(1686, 145)',
      strokeDasharray: null,
      strokeDashoffset: null,
      scaleX: { 0: 1 },
      origin: '0 50%',
      quantifier: 'stroke',
      easing: 'expo.out',
      isForce3d: true
    }).play();

    // SHAPES
    let shapes = new StaggerShape({
      parent:       logo,
      left:         '100%',
      x:            [ -20, 10, 0 ],
      y:            [ -25, -5, -35 ],
      quantifier:   'shape',
      shape:        [ 'circle', 'polygon', 'rect' ],
      radius:       7,
      fill:         'none',
      stroke:       [ 'deeppink', COLORS.cyan, COLORS.yellow ],
      strokeWidth:  { 5 : 0 },
      scale:        { .75 : 1 },
      delay:        'stagger(1860, 58)',
      isTimelineLess: true
    }).play();
  }

}
