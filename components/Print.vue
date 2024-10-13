<template>

    <div class="bg-white">


        <div id="print">
            <div style="display:flex;flex-direction:column">
                <img style="height: 100px; margin: 10px auto 50px  auto;" class="transition-all h-10 ease-in duration-300 my-5 short"
                    :src="logo" />
                <div style="padding:5px 15px; " class="flex flex-col w-full">
                    <table style="width: 100%; line-height: 40px;">
                        <tr>
                            <td style="text-align: start;">رقم الحركة</td>
                            <td>{{ details.transaction }}</td>
                        </tr>
                        <tr>
                            <td style="text-align: start;">اسم المفوتر</td>
                            <td>{{ details.billerName }}</td>
                        </tr>
                        <tr>
                            <td style="text-align: start;">نوع الخدمة</td>
                            <td>{{ details.serviceType }}</td>
                        </tr>
                        <tr>
                            <td style="text-align: start;">رقم الدفع الالكتروني</td>
                            <td>{{ details.invoice }}</td>
                        </tr>
                        <tr>
                            <td style="text-align: start;">اسم العميل</td>
                            <td>{{ details.no }}</td>
                        </tr>
                        <tr>
                            <td style="text-align: start;">القيمة</td>
                            <td>{{ parseFloat(details.amount) }}</td>
                        </tr>
                        <tr>
                            <td style="text-align: start;">العمولة</td>
                            <td>{{ parseFloat(details.fees) }}</td>
                        </tr>
                        <tr>
                            <td style="text-align: start;">القيمة المضافة</td>
                            <td>{{ parseFloat(details.addtionalAmount) }}</td>
                        </tr>
                        <tr>
                            <td style="text-align: start;">عمولة راحتك</td>
                            <td>{{ parseFloat(details.rahtakFees) }}</td>
                        </tr>
                        <tr>
                            <td style="text-align: start;">اجمالي القيمة</td>
                            <td>{{ parseFloat(details.total) }}</td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <hr>
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align: start;">التاريخ</td>
                            <td>{{ details.created_at }}</td>
                        </tr>
                        <tr>
                            <td style="text-align: start;">الفرع</td>
                            <td>{{ details.branch }}</td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <hr>
                            </td>
                        </tr>
                    </table>
                    <div class="flex justify-center" style="text-align: center; margin-top: 20px;">
                        <h1>0799991230</h1>
                        <h1>info@rahtak.net</h1>
                    </div>
                </div>
            </div>
        </div>
        <UButton @click="print" >طباعة</UButton>


    </div>


</template>

<script>
import logo from "~/assets/imgs/logo.png"

export default {
    props:{
        details:{
            default:{
                transaction: 0,
            created_at: 0,
            billerName: 0,
            serviceType: 0,
            invoice: 0,
            customerName: 0,
            amount: 0,
            fees: 0,
            addtionalAmount: 0,
            rahtakFees: 0,
            total:0,
            branch:"طبربور"

            }
        }
    },
    data() {
        return {
            logo
        }
    },
    methods: {
        print() {

            const divToPrint = document.getElementById("print").innerHTML;
            console.log(divToPrint)

            // Create a new window
            const newWindow = window.open('', '', 'height=600,width=800');

            // Add styles and content to the new window
            newWindow.document.write('<html dir="rtl" ><head><title>Print</title>');
            newWindow.document.write('</head><body>');
            newWindow.document.write(divToPrint);
            newWindow.document.write('</body></html>');

            // Close the document to complete the writing process
            newWindow.document.close();

            // Trigger the print dialog
            newWindow.print();

        }
    }
}

</script>