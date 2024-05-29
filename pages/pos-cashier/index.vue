<template>
<div>
    <v-row>
        <v-col cols="6">
            <v-card outlined>            
                <v-card-title>
                    Vendas
                </v-card-title>
            <v-data-table>
            </v-data-table>
            </v-card>
        </v-col>
        <v-col cols="6">
            <v-card outlined>
                <v-card-title>
                    Serviços
                </v-card-title>
            <v-data-table>
            </v-data-table>
            </v-card>
        </v-col>
    </v-row>
    <v-divider class="mt-4 mb-4"></v-divider>
    <v-row>
        <v-col cols="auto">
            <v-btn>Entrada</v-btn>
        </v-col>
         <v-col cols="auto">
            <v-btn>Saída</v-btn>
        </v-col>
    </v-row>

</div>
</template>