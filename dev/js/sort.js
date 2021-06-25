export default class Sort {
    formFactors = {
        ATX: 0,
        MicroATX: 1,
        MiniITX: 2,
    }
    label(data) {
        return data.sort((a, b) => {
            if (parseInt(a.label)) {
                return parseInt(a.label) < parseInt(b.label) ? -1 : 1
            } else {
                return a.label < b.label ? -1 : 1
            }
        })
    }
    cpu(data) {
        return data.sort((a, b) => {
            function perfCalc(item) {
                return item.cpu.threads * item.cpu.clock
            }
            return perfCalc(a) < perfCalc(b) ? 1 : -1
        })
    }
    form(data) {
        return data.sort((a, b) => {
            const formFactorA = this.formFactors[a.form_factor.replaceAll('-', '')]
            const formFactorB = this.formFactors[b.form_factor.replaceAll('-', '')]
            return formFactorA < formFactorB ? 1 : -1
        })
    }
    sort(data, sortID) {
        return this[sortID](data)
    }
}