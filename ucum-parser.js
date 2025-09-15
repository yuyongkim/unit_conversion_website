// UCUM 데이터 파서
// UCUM v2.2 (https://github.com/ucum-org/ucum) 데이터를 파싱하여 시스템에 통합

class UCUMParser {
    constructor() {
        this.ucumData = null;
        this.parsedUnits = {};
    }

    // UCUM XML 데이터 파싱 (실제 구현에서는 XML 파싱 라이브러리 사용)
    parseUCUMXML(xmlData) {
        // 실제 구현에서는 DOMParser 또는 xml2js 등을 사용
        // 여기서는 시뮬레이션된 파싱 결과를 반환
        return {
            units: this.simulateUCUMUnits(),
            constants: this.simulateUCUMConstants(),
            version: "2.2",
            source: "https://github.com/ucum-org/ucum"
        };
    }

    // UCUM v2.2에서 새로 추가된 단위들 시뮬레이션
    simulateUCUMUnits() {
        return {
            // UCUM v2.2 신규 단위
            "NTU": {
                name: "Nephelometric Turbidity Unit",
                symbol: "NTU",
                dimension: [0, 0, 0, 0, 0, 0, 0], // 무차원
                siFactor: 1,
                offset: 0,
                definition: "네펠로메트릭 탁도 단위",
                source: "UCUM v2.2"
            },
            "FNU": {
                name: "Formazin Turbidity Unit", 
                symbol: "FNU",
                dimension: [0, 0, 0, 0, 0, 0, 0], // 무차원
                siFactor: 1,
                offset: 0,
                definition: "포르마진 탁도 단위",
                source: "UCUM v2.2"
            },
            // 기존 UCUM 단위들 (일부)
            "Pa": {
                name: "pascal",
                symbol: "Pa",
                dimension: [1, -1, -2, 0, 0, 0, 0],
                siFactor: 1,
                offset: 0,
                definition: "SI derived unit of pressure",
                source: "UCUM"
            },
            "bar": {
                name: "bar",
                symbol: "bar", 
                dimension: [1, -1, -2, 0, 0, 0, 0],
                siFactor: 100000,
                offset: 0,
                definition: "CGS unit of pressure",
                source: "UCUM"
            }
        };
    }

    // UCUM v2.2에서 업데이트된 상수들 시뮬레이션
    simulateUCUMConstants() {
        return {
            "G": {
                name: "Newtonian constant of gravitation",
                value: 6.67430e-11,
                unit: "m³/(kg·s²)",
                source: "UCUM v2.2 - NIST update"
            },
            "k": {
                name: "Boltzmann constant",
                value: 1.380649e-23,
                unit: "J/K",
                source: "UCUM v2.2 - NIST update"
            },
            "e": {
                name: "elementary charge",
                value: 1.602176634e-19,
                unit: "C",
                source: "UCUM v2.2 - NIST update"
            },
            "ε0": {
                name: "vacuum electric permittivity",
                value: 8.8541878128e-12,
                unit: "F/m",
                source: "UCUM v2.2 - NIST update"
            },
            "Na": {
                name: "Avogadro constant",
                value: 6.02214076e23,
                unit: "mol⁻¹",
                source: "UCUM v2.2 - NIST update"
            },
            "mu": {
                name: "atomic mass constant",
                value: 1.66053906660e-27,
                unit: "kg",
                source: "UCUM v2.2 - NIST update"
            },
            "mp": {
                name: "proton mass",
                value: 1.67262192369e-27,
                unit: "kg",
                source: "UCUM v2.2 - NIST update"
            },
            "me": {
                name: "electron mass",
                value: 9.1093837015e-31,
                unit: "kg",
                source: "UCUM v2.2 - NIST update"
            }
        };
    }

    // UCUM 데이터를 시스템 데이터와 병합
    mergeWithSystemData(systemData) {
        const mergedData = JSON.parse(JSON.stringify(systemData)); // 깊은 복사
        
        // UCUM 단위들을 시스템에 통합
        const ucumUnits = this.simulateUCUMUnits();
        
        // 탁도 단위 추가
        if (!mergedData.physicalQuantities.turbidity) {
            mergedData.physicalQuantities.turbidity = {
                name: "탁도 (Turbidity)",
                dimension: [0, 0, 0, 0, 0, 0, 0],
                units: {}
            };
        }
        
        // UCUM v2.2 신규 단위 추가
        Object.entries(ucumUnits).forEach(([key, unit]) => {
            if (key === "NTU" || key === "FNU") {
                mergedData.physicalQuantities.turbidity.units[key] = unit;
            }
        });

        // UCUM 상수들로 시스템 상수 업데이트
        const ucumConstants = this.simulateUCUMConstants();
        Object.entries(ucumConstants).forEach(([key, constant]) => {
            if (mergedData.physicalConstants[key]) {
                mergedData.physicalConstants[key] = constant.value;
                console.log(`UCUM v2.2 업데이트: ${key} = ${constant.value} (${constant.source})`);
            }
        });

        return mergedData;
    }

    // UCUM 데이터 검증
    validateUCUMData(data) {
        const errors = [];
        const warnings = [];

        // 필수 필드 검증
        if (!data.units) {
            errors.push("UCUM units 데이터가 없습니다.");
        }

        if (!data.constants) {
            errors.push("UCUM constants 데이터가 없습니다.");
        }

        // 단위 데이터 검증
        if (data.units) {
            Object.entries(data.units).forEach(([key, unit]) => {
                if (!unit.symbol) {
                    errors.push(`단위 ${key}: symbol이 없습니다.`);
                }
                if (!unit.dimension || !Array.isArray(unit.dimension)) {
                    errors.push(`단위 ${key}: dimension이 올바르지 않습니다.`);
                }
                if (typeof unit.siFactor !== 'number') {
                    errors.push(`단위 ${key}: siFactor이 숫자가 아닙니다.`);
                }
            });
        }

        // 상수 데이터 검증
        if (data.constants) {
            Object.entries(data.constants).forEach(([key, constant]) => {
                if (typeof constant.value !== 'number') {
                    errors.push(`상수 ${key}: value가 숫자가 아닙니다.`);
                }
                if (!constant.unit) {
                    warnings.push(`상수 ${key}: unit이 없습니다.`);
                }
            });
        }

        return {
            isValid: errors.length === 0,
            errors: errors,
            warnings: warnings
        };
    }

    // UCUM 데이터를 JSON으로 내보내기
    exportToJSON(data, filename = 'ucum-data.json') {
        const jsonString = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // UCUM 데이터 통계 생성
    generateStatistics(data) {
        const stats = {
            totalUnits: 0,
            totalConstants: 0,
            physicalQuantities: {},
            sources: {},
            dimensions: {}
        };

        // 단위 통계
        if (data.units) {
            stats.totalUnits = Object.keys(data.units).length;
            
            Object.values(data.units).forEach(unit => {
                // 물리량별 통계
                const dimStr = unit.dimension ? unit.dimension.join(',') : 'unknown';
                stats.dimensions[dimStr] = (stats.dimensions[dimStr] || 0) + 1;
                
                // 출처별 통계
                const source = unit.source || 'unknown';
                stats.sources[source] = (stats.sources[source] || 0) + 1;
            });
        }

        // 상수 통계
        if (data.constants) {
            stats.totalConstants = Object.keys(data.constants).length;
        }

        return stats;
    }
}

// UCUM 데이터 로더 (실제 구현에서는 fetch API 사용)
class UCUMDataLoader {
    constructor() {
        this.baseURL = 'https://raw.githubusercontent.com/ucum-org/ucum/main/';
        this.parser = new UCUMParser();
    }

    // UCUM XML 파일 로드 (시뮬레이션)
    async loadUCUMXML() {
        try {
            // 실제 구현에서는 fetch API로 XML 파일 로드
            // const response = await fetch(`${this.baseURL}ucum-essence.xml`);
            // const xmlText = await response.text();
            
            // 시뮬레이션된 XML 데이터
            const simulatedXML = this.simulateUCUMXML();
            return this.parser.parseUCUMXML(simulatedXML);
        } catch (error) {
            console.error('UCUM XML 로드 실패:', error);
            throw error;
        }
    }

    // 시뮬레이션된 UCUM XML 데이터
    simulateUCUMXML() {
        return `<?xml version="1.0" encoding="UTF-8"?>
<ucum version="2.2">
    <unit code="NTU" name="Nephelometric Turbidity Unit" dimension="1"/>
    <unit code="FNU" name="Formazin Turbidity Unit" dimension="1"/>
    <constant name="G" value="6.67430e-11" unit="m³/(kg·s²)"/>
    <constant name="k" value="1.380649e-23" unit="J/K"/>
</ucum>`;
    }

    // 시스템 데이터와 UCUM 데이터 병합
    async mergeWithSystem(systemData) {
        try {
            const ucumData = await this.loadUCUMXML();
            const validation = this.parser.validateUCUMData(ucumData);
            
            if (!validation.isValid) {
                console.error('UCUM 데이터 검증 실패:', validation.errors);
                return systemData;
            }

            if (validation.warnings.length > 0) {
                console.warn('UCUM 데이터 경고:', validation.warnings);
            }

            const mergedData = this.parser.mergeWithSystemData(systemData);
            console.log('UCUM v2.2 데이터 통합 완료');
            
            return mergedData;
        } catch (error) {
            console.error('UCUM 데이터 통합 실패:', error);
            return systemData;
        }
    }
}

// 전역 UCUM 파서 인스턴스
window.ucumParser = new UCUMParser();
window.ucumLoader = new UCUMDataLoader();
