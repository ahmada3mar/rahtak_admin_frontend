<template>
  <div class="py-5 px-2">


    <UCard v-if="!paid">
      <UForm @submit="response ? pay() : inq()">
        <UFormGroup class="my-2" v-if="cat.length > 1" label="الفئة">
          <USelect v-model="catValue" :options="cat" option-attribute="nameEn" value-attribute="nameEn" />
        </UFormGroup>
        <UFormGroup class="my-2" :label="input.arDesc">
          <UInput @update:model-value="response = null" v-model="billingNo" :placeholder="input.arDesc" />
        </UFormGroup>
        <UFormGroup v-if="input.billingNoRequired" class="my-2" label="القيمة">
          <UInput  @update:model-value="response = null" v-model="paymentAmount" placeholder="ادخل القيمة" />
        </UFormGroup>

        <div v-if="response">
          <UFormGroup class="my-2" label="اسم العميل">
            <UInput :disabled="true" :value="response.customerName" />
          </UFormGroup>
          <UFormGroup class="my-2" label="ملاحظات">
            <UInput :disabled="true" :value="response.freeText" />
          </UFormGroup>
          <UFormGroup class="my-2" label="الحد الأعلى">
            <UInput :disabled="true" :value="response.maxPaymentLimit" />
          </UFormGroup>
          <UFormGroup class="my-2" label="الحد الأدنى">
            <UInput :disabled="true" :value="response.minPaymentLimit" />
          </UFormGroup>
          <UFormGroup class="my-2" label="القيمة">
            <UInput type="number" :disabled="!response.isAmountEnabled" v-model="payments.amount" />
          </UFormGroup>
          <UFormGroup class="my-2" label="عمولات">
            <UInput :disabled="true" v-model="payments.fees" />
          </UFormGroup>
          <UFormGroup class="my-2" label="القيمة المضافة">
            <UInput :disabled="true" v-model="payments.addtionalAmount" />
          </UFormGroup>
          <UFormGroup class="my-2" label="عمولة راحتك">
            <UInput :disabled="true" type="number" :value="getFees()" />
          </UFormGroup>
          <UFormGroup class="my-2" label="القيمة الكلية">
            <UInput :disabled="true"
              :value="parseFloat(getFees() + Object.values(payments).reduce((a, b) => a + b, 0))" />
          </UFormGroup>
        </div>

        <div class="flex mt-5">
          <UButton :size="'lg'" type="submit" class="mr-auto" :label="response ? 'دفع' : 'استعلام'" />
        </div>
      </UForm>
    </UCard>
    <Print v-else :details="paid" />
  </div>

</template>

<script>
import useApiFetch from '~/composables/UseApiFetch';

export default {
  data() {
    return {
      input: {},
      cat: [],
      billingNo: "",
      catValue: "",
      response: null,
      paid: false,
      paymentAmount:0.00,
      payments: {
        amount: 0.00,
        fees: 0.00,
        addtionalAmount: 0.00,

      }
    };
  },

  mounted() {

    useApiFetch(`/sadad/get-service-details/${useRoute().params.id}`)
      .then(res => {
        this.input = res.input;
        this.cat = res.cat;

      })



  },
  methods: {
    getFees() {

      if (this.payments.amount <= 100) return 0.25
      let times = parseInt(((this.payments.amount - 1) / 100)) + 1
      return (times * 0.5) - 0.25


    },
    inq() {
      const [service, code] = useRoute().params.service.split("_")

      let data = {
        paymentType: this.input.paymentType,
        catValue: this.catValue,
        billingNo: this.billingNo,
        service: service,
        id: useRoute().params.id,
        code: code,
        billingNoRequired:this.input.billingNoRequired,
        containsPrepaidCats:this.input.containsPrepaidCats,
        paymentAmount:this.paymentAmount
      };

      useApiFetch(`/sadad/inquire`, {
        method: "POST",
        body: data
      })
        .then(r => {
          this.response = r
          this.payments.addtionalAmount = parseFloat(r.addtionalAmount)
          this.payments.amount = parseFloat(r.amount)
          this.payments.fees = parseFloat(r.fees)

        }).catch(err => {
          useToast().add({
            title: err.response._data.message,
            color: 'orange'
          })
        })



    },
    pay() {

      const [service, code] = useRoute().params.service.split("_")

      let data = {
        paymentType: this.input.paymentType,
        catValue: this.catValue,
        billingNo: this.billingNo,
        billerName: service,
        billerCode: code,
        billerType: useRoute().params.type,
        totalPayment: this.response.totalPayment,
        dueAmount: this.response.dueAmount,
        serviceTypeNo: useRoute().params.id,
        transType: this.response.transType,
        amount: this.response.amount,
        fees: this.response.fees,
        rahtak_fees:this.getFees(),
        validationCode: this.response.validationCode,
        clientName: 'ahmad emar',
        clientMobile: '0799991230',
        billingNoRequired:this.input.billingNoRequired,
        containsPrepaidCats:this.input.containsPrepaidCats,
        additionalAmount: this.payments.addtionalAmount ?? 0,
        

      };

      useApiFetch(`/sadad/pay/${useRoute().params.id}`, {
        method: "POST",
        body: data
      })
      .then((r) => {
              useToast().add({
            title: 'تم الدفع بنجاح',
            color: 'green'
          })
          
          this.paid = {
            transaction: r.bankTrxID,
            created_at: r.sTMTDate,
            billerName: service,
            serviceType: useRoute().params.type,
            invoice: this.billingNo,
            customerName: this.response.customerName,
            amount: this.payments.amount,
            fees: this.payments.fees,
            addtionalAmount: this.payments.addtionalAmount,
            rahtakFees: this.getFees(),
            total: parseFloat(this.getFees() + Object.values(this.payments).reduce((a, b) => a + b, 0)),
            branch: "tabrbor"

          };
      })
      .catch(err => {
          useToast().add({
            title: err.response._data.message,
            color: 'red'
          })
        })

        





    },

  },
};
</script>
