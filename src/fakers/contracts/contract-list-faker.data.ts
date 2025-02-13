import { NumberValueAccessor } from '@angular/forms';
import { ContractListRequest, ContractListResponse } from '../../app/infra/gateways/contracts/contracts-gateway.model';

interface Contract {
    id: string;
    contract_number: string;
    contract_type: string;
    company_name: string;
    company_bu: string;
    supplier_rz: string;
    supplier_cnpj: string;
    contract_expiration_date_utc: string;
    contract_expiration_days: number;
}

export class ContractListFakerData {
    static readonly contracts: Contract[] = [
        {
            id: '0e6b6db7-5e1d-4366-a659-b429e3aad777',
            contract_number: '0006453',
            contract_type: 'logistics',
            company_name: 'olist',
            company_bu: 'store',
            supplier_rz: 'Uriel Pharmacy Inc.',
            supplier_cnpj: '89.121.660/0001-26',
            contract_expiration_date_utc: '2025-04-29 13:24:52',
            contract_expiration_days: 76,
        },
        {
            id: '9f5612f2-ca2e-4502-8af8-c021b4255ea4',
            contract_number: '0009241',
            contract_type: 'logistics',
            company_name: 'tiny',
            company_bu: 'tiny',
            supplier_rz: 'KRAMER NOVIS',
            supplier_cnpj: '08.166.079/0001-06',
            contract_expiration_date_utc: '2025-04-02 05:56:29',
            contract_expiration_days: 49,
        },
        {
            id: 'dcf60b98-ab8e-4f2e-b608-ece27058860f',
            contract_number: '0005819',
            contract_type: 'tech',
            company_name: 'vnda',
            company_bu: 'vnda',
            supplier_rz: 'State of Florida DOH Central Pharmacy',
            supplier_cnpj: '29.349.355/0001-53',
            contract_expiration_date_utc: '2025-11-08 20:51:17',
            contract_expiration_days: 269,
        },
        {
            id: '605e22a9-47d0-4ae0-9e0e-e279aa81e04e',
            contract_number: '0009450',
            contract_type: 'logistics',
            company_name: 'pax',
            company_bu: 'store',
            supplier_rz: 'PD-Rx Pharmaceuticals, Inc.',
            supplier_cnpj: '85.947.879/0001-13',
            contract_expiration_date_utc: '2025-11-07 15:47:47',
            contract_expiration_days: 268,
        },
        {
            id: '1dd40d06-b0d8-42e0-b88b-66e66b19e2e3',
            contract_number: '0003076',
            contract_type: 'tech',
            company_name: 'pax',
            company_bu: 'store',
            supplier_rz: 'International Cosmetics Ltd.',
            supplier_cnpj: '02.136.188/0001-26',
            contract_expiration_date_utc: '2025-06-20 10:13:38',
            contract_expiration_days: 128,
        },
        {
            id: 'ad49d44c-7bb2-4410-8967-f88cde78fb7d',
            contract_number: '0006724',
            contract_type: 'shadow it',
            company_name: 'olist',
            company_bu: 'store',
            supplier_rz: 'Mylan Pharmaceuticals Inc.',
            supplier_cnpj: '69.983.143/0001-03',
            contract_expiration_date_utc: '2025-07-04 09:46:51',
            contract_expiration_days: 142,
        },
        {
            id: '59a28c99-63a3-4c48-8f96-466e2204b847',
            contract_number: '0004918',
            contract_type: 'shadow it',
            company_name: 'tiny',
            company_bu: 'tiny',
            supplier_rz: 'C.F.E.B. Sisley',
            supplier_cnpj: '38.169.871/0001-99',
            contract_expiration_date_utc: '2025-09-24 04:52:25',
            contract_expiration_days: 224,
        },
        {
            id: '73945876-b604-48bb-8f56-3bc58dc9ae0a',
            contract_number: '0001960',
            contract_type: 'logistics',
            company_name: 'olist',
            company_bu: 'store',
            supplier_rz: 'Medi-Physics Inc.',
            supplier_cnpj: '88.429.667/0001-86',
            contract_expiration_date_utc: '2025-08-22 09:28:52',
            contract_expiration_days: 191,
        },
        {
            id: '92739f1d-2afd-4e63-b859-10f82770dea9',
            contract_number: '0007326',
            contract_type: 'logistics',
            company_name: 'pax',
            company_bu: 'store',
            supplier_rz: 'Ventura Corporation LTD',
            supplier_cnpj: '72.007.979/0001-78',
            contract_expiration_date_utc: '2025-11-30 07:42:35',
            contract_expiration_days: 291,
        },
        {
            id: '47332c95-e6d7-487f-a6da-e3be9a218717',
            contract_number: '0000737',
            contract_type: 'logistics',
            company_name: 'pax',
            company_bu: 'store',
            supplier_rz: 'China Ningbo Shangge Cosmetic Technology Corp.',
            supplier_cnpj: '68.674.624/0001-96',
            contract_expiration_date_utc: '2025-07-08 17:31:35',
            contract_expiration_days: 146,
        },
        {
            id: '2df2fddf-6660-450b-a57d-2f4747eb3867',
            contract_number: '0006729',
            contract_type: 'shadow it',
            company_name: 'tiny',
            company_bu: 'tiny',
            supplier_rz: 'Major Pharmaceuticals',
            supplier_cnpj: '10.284.083/0001-41',
            contract_expiration_date_utc: '2025-08-28 22:34:31',
            contract_expiration_days: 197,
        },
        {
            id: '002368e3-7c4a-4d9e-8b2f-23d8f3be4751',
            contract_number: '0000322',
            contract_type: 'shadow it',
            company_name: 'olist',
            company_bu: 'store',
            supplier_rz: 'Select Brand Distributors',
            supplier_cnpj: '58.305.067/0001-12',
            contract_expiration_date_utc: '2025-06-19 02:09:29',
            contract_expiration_days: 127,
        },
        {
            id: '3a22d1fa-af7e-4060-ac67-bf0bac6abd7f',
            contract_number: '0007260',
            contract_type: 'shadow it',
            company_name: 'olist',
            company_bu: 'store',
            supplier_rz: 'Wal-Mart Stores Inc',
            supplier_cnpj: '82.730.421/0001-98',
            contract_expiration_date_utc: '2025-04-09 06:42:05',
            contract_expiration_days: 56,
        },
        {
            id: 'c490f241-9ad5-4856-8305-a0466616f742',
            contract_number: '0000144',
            contract_type: 'logistics',
            company_name: 'pax',
            company_bu: 'store',
            supplier_rz: 'Hikma Pharmaceutical',
            supplier_cnpj: '48.570.805/0001-05',
            contract_expiration_date_utc: '2025-08-12 13:18:36',
            contract_expiration_days: 181,
        },
        {
            id: '6d3fc0f9-a1d7-488c-b3bf-6d365cb025b5',
            contract_number: '0003314',
            contract_type: 'tech',
            company_name: 'pax',
            company_bu: 'store',
            supplier_rz: 'Actavis Elizabeth LLC',
            supplier_cnpj: '17.678.736/0001-34',
            contract_expiration_date_utc: '2025-08-20 12:06:30',
            contract_expiration_days: 189,
        },
    ];

    static getContractList(request: ContractListRequest): ContractListResponse {
        const totalPagesCount = Math.ceil(this.contracts.length / request.itemsPerPage);
        const startIdx = request.page * request.itemsPerPage;
        const endIdx = startIdx + request.itemsPerPage;

        const items = this.contracts.slice(startIdx, endIdx).map((contract) => ({
            contractId: contract.id,
            contractNumber: contract.contract_number,
            contractType: contract.contract_type,
            companyName: contract.company_name,
            companyBu: contract.company_bu,
            supplierRz: contract.supplier_rz,
            supplierCnpj: contract.supplier_cnpj,
            contractExpirationDateUtc: new Date(contract.contract_expiration_date_utc),
            contractExpirationDays: contract.contract_expiration_days,
        }));
        return {
            items: items,
            totalItemsCount: this.contracts.length,
            pageCount: totalPagesCount,
        };
    }
}
