<template>
    <div class="header">
        <div class="left_side">
            <div class="container">
                <p class="title">{{ correctPhrase }}</p>
                <p class="description">{{ $t("main.createTemplateDescription") }}</p>
            </div>
        </div>
        <div class="right_side">
            
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                
            }
        },
        methods: {
            
        },
        computed: {
            editingTemplate(){
                return this.$store.state.main.editingTemplate;
            },
            adminPermissions(){
                return this.$store.state.main.permissions.create_premade_templates;
            },
            correctPhrase(){
                if (this.editingTemplate && this.adminPermissions) {
                    return this.$t("main.editTemplate");
                } else if (this.editingTemplate) {
                    return this.$t("main.editWidget");
                } else {
                    return this.$t("main.createTemplate");
                }
            }
        }
    }
</script>

<style scoped>
    .header{
        height: 9vh;
        box-sizing: border-box;
        border-bottom: 1px solid #d2d2d2;
        display: flex;
        justify-content: center;
        padding-left: 35px;
        position: relative;
        z-index: 2;
    }

    .title{
        color: #4d4d4d;
        font-size: 22px;
        margin: 0px;
        margin-bottom: 6px;
    }

    .description{
        font-size: 12px;
        margin: 0px;
        color: #f59032;
        display: inline-block;
        position: relative;
    }

    .right_margin{
        margin-right: 10px;
    }

    .left_side{
        width: 50%;
        display: flex;
        align-items: center;
    }

    .right_side{
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    @media screen and (max-width: 1800px) {
        .header{
            
        }
    }
</style>
