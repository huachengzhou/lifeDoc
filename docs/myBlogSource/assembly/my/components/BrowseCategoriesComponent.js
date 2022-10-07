var BrowseCategoriesComponent = {
    template: `
        <div class="container">
            <div class="browse_categories">
                <div class="row">
                    <div class="col-lg-2 col-md-4 col-sm-4 col-6 full_wdth" v-for="(item,index) in newLinks">
                        <div class="br-channel">
                            <div class="br-channel-img">
                                <a href="#" title="">
                                    <img :src="item.path" alt="">
                                </a>
                            </div>
                            <div class="br-info">
                                <h3><a href="#" title="">{{item.name}}   <span v-if="index % 2 == 0" class="verify_ic"><i class="icon-tick"></i></span></a></h3>
                                <span>{{item.code}}</span>
                            </div>
                        </div><!--br-channel end-->
                    </div>
                </div>
            </div><!--</div> end-->
            <div class="browse_cat_lists">
                <h3>Browse Categories</h3>
                <ul v-for="items in getNames()">
                    <li v-for="(item,index) in items"><a href="#" title="">{{item}}</a></li>
                </ul>
                <div class="clearfix"></div>
            </div><!--browse_cat_lists end-->
        </div>

          `,
    props: {
        src_link: {
            type: String,
            required: false,
        }
    },
    computed: {
        newLinks: function () {
            var arr = [];
            var len = 18;
            for (let i = 1; i <= len; i++) {
                var name = "";
                switch (i) {
                    case 1: {
                        name = 'BattleState';
                        break;
                    }
                    case 2: {
                        name = 'BlackPink tst';
                        break;
                    }
                    case 3: {
                        name = 'Vevo';
                        break;
                    }
                    case 4: {
                        name = 'Official PSY';
                        break;
                    }
                    case 5: {
                        name = 'People';
                        break;
                    }
                    case 6: {
                        name = 'SmTownSmTown';
                        break;
                    }
                    case 7: {
                        name = 'BattleState';
                        break;
                    }
                    case 8: {
                        name = 'BlackPink tst';
                        break;
                    }
                    case 9: {
                        name = 'Vevo';
                        break;
                    }
                    case 10: {
                        name = 'Official PSY';
                        break;
                    }
                    case 11: {
                        name = 'People';
                        break;
                    }
                    case 12: {
                        name = 'SmTownSmTown';
                        break;
                    }
                    case 13: {
                        name = 'BattleState';
                        break;
                    }
                    case 14: {
                        name = 'BlackPink tst';
                        break;
                    }
                    case 15: {
                        name = 'Vevo';
                        break;
                    }
                    case 16: {
                        name = 'Official PSY';
                        break;
                    }
                    case 17: {
                        name = 'People';
                        break;
                    }
                    case 18: {
                        name = 'SmTownSmTown';
                        break;
                    }
                    default: {
                        break;
                    }
                }
                var obj = {
                    path: this.src_link + "images/resources/br" + i + ".jpg",
                    name: name,
                    code: getRandomIntegerNumber() + ' Videos'
                };
                arr.push(obj);
            }
            return arr;
        }
    },
    methods:{
        getNames:function () {
            var names = [] ;
            names.push('Abaft');
            names.push('Brick');
            names.push('Purpose');
            names.push('Shallow');
            names.push('Spray');
            names.push('Seashore');
            names.push('Orange');
            names.push('Dynamic');
            names.push('Planesnames');
            names.push('Leg');
            names.push('Fall');
            names.push('Pin');
            names.push('Trouble');
            names.push('Cemetery');
            names.push('Sort');
            names.push('Respect');
            names.push('Rice');
            names.push('Disagreeable');
            names.push('Minister');
            names.push('Quiet');
            names.push('Rescue');
            names.push('Agonizing');
            names.push('Stitch');
            names.push('Scissors');
            names.push('Spiffy');
            names.push('Tin');
            names.push('Rambunctious');
            names.push('Sordid');
            names.push('Wise');
            names.push('Boy');
            names.push('Fold');
            names.push('Moan');
            names.push('Overjoyed');
            names.push('Obsequious');
            names.push('Heat');
            names.push('Incompetent');
            names.push('Grin');
            names.push('Fat');
            names.push('Gate');
            var groupIndex = 7;//分成7个一组
            var result = [];
            for (var k = 0, len = names.length; k < len; k += groupIndex) {
                result.push(names.slice(k, k + groupIndex));
            }
            return result;
        }
    }

};
