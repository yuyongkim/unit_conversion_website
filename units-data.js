// 화공 단위 변환 시스템 - 단위 정의 데이터
// PRD에 따라 차원 기반 단위 선택 시스템 구현
// UCUM v2.2 (https://github.com/ucum-org/ucum) 기반 데이터 통합

const unitsData = {
    // 물리량별 단위 정의
    physicalQuantities: {
        pressure: {
            name: "압력 (Pressure)",
            dimension: [1, -1, -2, 0, 0, 0, 0], // [M, L, T, Θ, N, I, J]
            units: {
                "Pa": {
                    name: "파스칼",
                    symbol: "Pa",
                    siFactor: 1,
                    offset: 0,
                    definition: "1 N/m² = 1 kg/(m·s²)",
                    source: "SI 기본 단위"
                },
                "kPa": {
                    name: "킬로파스칼",
                    symbol: "kPa",
                    siFactor: 1000,
                    offset: 0,
                    definition: "1000 Pa",
                    source: "SI 유도 단위"
                },
                "MPa": {
                    name: "메가파스칼",
                    symbol: "MPa",
                    siFactor: 1000000,
                    offset: 0,
                    definition: "1,000,000 Pa",
                    source: "SI 유도 단위"
                },
                "bar": {
                    name: "바",
                    symbol: "bar",
                    siFactor: 100000,
                    offset: 0,
                    definition: "100,000 Pa = 0.1 MPa",
                    source: "CGS 단위계"
                },
                "psi": {
                    name: "파운드제곱인치당 파운드",
                    symbol: "psi",
                    siFactor: 6894.757,
                    offset: 0,
                    definition: "1 lbf/in² = 6894.757 Pa",
                    source: "영국 단위계"
                },
                "psig": {
                    name: "게이지 압력 (파운드제곱인치당 파운드)",
                    symbol: "psig",
                    siFactor: 6894.757,
                    offset: 101325, // 대기압 기준
                    definition: "게이지 압력 = 절대압력 - 대기압 (14.696 psia 기준)",
                    source: "영국 단위계 (게이지)"
                },
                "atm": {
                    name: "대기압",
                    symbol: "atm",
                    siFactor: 101325,
                    offset: 0,
                    definition: "표준 대기압 = 101,325 Pa",
                    source: "표준 대기압"
                },
                "mmHg": {
                    name: "수은주 밀리미터",
                    symbol: "mmHg",
                    siFactor: 133.322,
                    offset: 0,
                    definition: "1 mmHg = 133.322 Pa",
                    source: "의학/기상학 단위"
                },
                "torr": {
                    name: "토르",
                    symbol: "torr",
                    siFactor: 133.322,
                    offset: 0,
                    definition: "1 torr = 1/760 atm = 133.322 Pa",
                    source: "Torricelli 단위"
                }
            }
        },
        
        flow: {
            name: "유량 (Flow Rate)",
            dimension: [0, 3, -1, 0, 0, 0, 0], // [M, L, T, Θ, N, I, J]
            units: {
                // SI 기본 단위
                "m3/s": {
                    name: "세제곱미터 매초",
                    symbol: "m³/s",
                    siFactor: 1,
                    offset: 0,
                    definition: "SI 기본 유량 단위",
                    source: "SI 기본 단위"
                },
                "m3/h": {
                    name: "세제곱미터 매시간",
                    symbol: "m³/h",
                    siFactor: 1/3600,
                    offset: 0,
                    definition: "1 m³/h = 2.78×10⁻⁴ m³/s",
                    source: "SI 유도 단위"
                },
                "m3/d": {
                    name: "세제곱미터 매일",
                    symbol: "m³/d",
                    siFactor: 1/86400,
                    offset: 0,
                    definition: "1 m³/d = 1.16×10⁻⁵ m³/s",
                    source: "SI 유도 단위"
                },
                "m3/min": {
                    name: "세제곱미터 매분",
                    symbol: "m³/min",
                    siFactor: 1/60,
                    offset: 0,
                    definition: "1 m³/min = 1.67×10⁻² m³/s",
                    source: "SI 유도 단위"
                },
                
                // 리터 단위
                "L/s": {
                    name: "리터 매초",
                    symbol: "L/s",
                    siFactor: 0.001,
                    offset: 0,
                    definition: "1 L/s = 0.001 m³/s",
                    source: "SI 유도 단위"
                },
                "L/min": {
                    name: "리터 매분",
                    symbol: "L/min",
                    siFactor: 0.001/60,
                    offset: 0,
                    definition: "1 L/min = 1.67×10⁻⁵ m³/s",
                    source: "SI 유도 단위"
                },
                "L/h": {
                    name: "리터 매시간",
                    symbol: "L/h",
                    siFactor: 0.001/3600,
                    offset: 0,
                    definition: "1 L/h = 2.78×10⁻⁷ m³/s",
                    source: "SI 유도 단위"
                },
                "L/d": {
                    name: "리터 매일",
                    symbol: "L/d",
                    siFactor: 0.001/86400,
                    offset: 0,
                    definition: "1 L/d = 1.16×10⁻⁸ m³/s",
                    source: "SI 유도 단위"
                },
                
                // 밀리리터 단위
                "mL/s": {
                    name: "밀리리터 매초",
                    symbol: "mL/s",
                    siFactor: 0.000001,
                    offset: 0,
                    definition: "1 mL/s = 1×10⁻⁶ m³/s",
                    source: "SI 유도 단위"
                },
                "mL/min": {
                    name: "밀리리터 매분",
                    symbol: "mL/min",
                    siFactor: 0.000001/60,
                    offset: 0,
                    definition: "1 mL/min = 1.67×10⁻⁸ m³/s",
                    source: "SI 유도 단위"
                },
                "mL/h": {
                    name: "밀리리터 매시간",
                    symbol: "mL/h",
                    siFactor: 0.000001/3600,
                    offset: 0,
                    definition: "1 mL/h = 2.78×10⁻¹⁰ m³/s",
                    source: "SI 유도 단위"
                },
                "mL/d": {
                    name: "밀리리터 매일",
                    symbol: "mL/d",
                    siFactor: 0.000001/86400,
                    offset: 0,
                    definition: "1 mL/d = 1.16×10⁻¹¹ m³/s",
                    source: "SI 유도 단위"
                },
                
                // 미국 갤런 단위
                "gpm": {
                    name: "갤런 매분 (미국)",
                    symbol: "gpm",
                    siFactor: 0.00378541/60,
                    offset: 0,
                    definition: "1 US gallon/min = 6.309×10⁻⁵ m³/s",
                    source: "미국 단위계"
                },
                "gph": {
                    name: "갤런 매시간 (미국)",
                    symbol: "gph",
                    siFactor: 0.00378541/3600,
                    offset: 0,
                    definition: "1 US gallon/h = 1.051×10⁻⁶ m³/s",
                    source: "미국 단위계"
                },
                "gpd": {
                    name: "갤런 매일 (미국)",
                    symbol: "gpd",
                    siFactor: 0.00378541/86400,
                    offset: 0,
                    definition: "1 US gallon/d = 4.381×10⁻⁸ m³/s",
                    source: "미국 단위계"
                },
                "gps": {
                    name: "갤런 매초 (미국)",
                    symbol: "gps",
                    siFactor: 0.00378541,
                    offset: 0,
                    definition: "1 US gallon/s = 3.785×10⁻³ m³/s",
                    source: "미국 단위계"
                },
                
                // 영국 갤런 단위
                "gpm-uk": {
                    name: "갤런 매분 (영국)",
                    symbol: "gpm (UK)",
                    siFactor: 0.00454609/60,
                    offset: 0,
                    definition: "1 UK gallon/min = 7.577×10⁻⁵ m³/s",
                    source: "영국 단위계"
                },
                "gph-uk": {
                    name: "갤런 매시간 (영국)",
                    symbol: "gph (UK)",
                    siFactor: 0.00454609/3600,
                    offset: 0,
                    definition: "1 UK gallon/h = 1.263×10⁻⁶ m³/s",
                    source: "영국 단위계"
                },
                "gpd-uk": {
                    name: "갤런 매일 (영국)",
                    symbol: "gpd (UK)",
                    siFactor: 0.00454609/86400,
                    offset: 0,
                    definition: "1 UK gallon/d = 5.262×10⁻⁸ m³/s",
                    source: "영국 단위계"
                },
                "gps-uk": {
                    name: "갤런 매초 (영국)",
                    symbol: "gps (UK)",
                    siFactor: 0.00454609,
                    offset: 0,
                    definition: "1 UK gallon/s = 4.546×10⁻³ m³/s",
                    source: "영국 단위계"
                },
                
                // 세제곱피트 단위
                "cfm": {
                    name: "세제곱피트 매분",
                    symbol: "cfm",
                    siFactor: 0.0283168/60,
                    offset: 0,
                    definition: "1 ft³/min = 4.72×10⁻⁴ m³/s",
                    source: "영국 단위계"
                },
                "cfh": {
                    name: "세제곱피트 매시간",
                    symbol: "cfh",
                    siFactor: 0.0283168/3600,
                    offset: 0,
                    definition: "1 ft³/h = 7.866×10⁻⁶ m³/s",
                    source: "영국 단위계"
                },
                "cfd": {
                    name: "세제곱피트 매일",
                    symbol: "cfd",
                    siFactor: 0.0283168/86400,
                    offset: 0,
                    definition: "1 ft³/d = 3.278×10⁻⁷ m³/s",
                    source: "영국 단위계"
                },
                "cfs": {
                    name: "세제곱피트 매초",
                    symbol: "cfs",
                    siFactor: 0.0283168,
                    offset: 0,
                    definition: "1 ft³/s = 2.832×10⁻² m³/s",
                    source: "영국 단위계"
                },
                
                // 배럴 단위 (석유)
                "bbl/d": {
                    name: "배럴 매일",
                    symbol: "bbl/d",
                    siFactor: 0.1589872949/86400,
                    offset: 0,
                    definition: "1 barrel/day = 1.840×10⁻⁶ m³/s",
                    source: "석유 산업"
                },
                "bbl/h": {
                    name: "배럴 매시간",
                    symbol: "bbl/h",
                    siFactor: 0.1589872949/3600,
                    offset: 0,
                    definition: "1 barrel/h = 4.416×10⁻⁵ m³/s",
                    source: "석유 산업"
                },
                "bbl/min": {
                    name: "배럴 매분",
                    symbol: "bbl/min",
                    siFactor: 0.1589872949/60,
                    offset: 0,
                    definition: "1 barrel/min = 2.650×10⁻³ m³/s",
                    source: "석유 산업"
                },
                "bbl/s": {
                    name: "배럴 매초",
                    symbol: "bbl/s",
                    siFactor: 0.1589872949,
                    offset: 0,
                    definition: "1 barrel/s = 1.590×10⁻¹ m³/s",
                    source: "석유 산업"
                },
                
                // 표준 조건 단위
                "SCFM": {
                    name: "표준 세제곱피트 매분",
                    symbol: "SCFM",
                    siFactor: 0.0283168/60,
                    offset: 0,
                    definition: "60°F, 14.696 psia 조건에서의 ft³/min",
                    source: "표준 조건 단위"
                },
                "NM3/h": {
                    name: "표준 세제곱미터 매시간",
                    symbol: "NM³/h",
                    siFactor: 1/3600,
                    offset: 0,
                    definition: "0°C, 1 atm 조건에서의 m³/h",
                    source: "표준 조건 단위"
                },
                "NM3/d": {
                    name: "표준 세제곱미터 매일",
                    symbol: "NM³/d",
                    siFactor: 1/86400,
                    offset: 0,
                    definition: "0°C, 1 atm 조건에서의 m³/d",
                    source: "표준 조건 단위"
                },
                
                // 기타 단위
                "oz/s": {
                    name: "온스 매초",
                    symbol: "oz/s",
                    siFactor: 0.0000295735,
                    offset: 0,
                    definition: "1 oz/s = 2.957×10⁻⁵ m³/s",
                    source: "미국 단위계"
                },
                "oz/min": {
                    name: "온스 매분",
                    symbol: "oz/min",
                    siFactor: 0.0000295735/60,
                    offset: 0,
                    definition: "1 oz/min = 4.929×10⁻⁷ m³/s",
                    source: "미국 단위계"
                },
                "oz/h": {
                    name: "온스 매시간",
                    symbol: "oz/h",
                    siFactor: 0.0000295735/3600,
                    offset: 0,
                    definition: "1 oz/h = 8.215×10⁻⁹ m³/s",
                    source: "미국 단위계"
                }
            }
        },
        
        viscosity: {
            name: "점도 (Viscosity)",
            dimension: [1, -1, -1, 0, 0, 0, 0], // [M, L, T, Θ, N, I, J]
            units: {
                "Pa·s": {
                    name: "파스칼초",
                    symbol: "Pa·s",
                    siFactor: 1,
                    offset: 0,
                    definition: "SI 기본 점도 단위 = kg/(m·s)",
                    source: "SI 기본 단위"
                },
                "cP": {
                    name: "센티푸아즈",
                    symbol: "cP",
                    siFactor: 0.001,
                    offset: 0,
                    definition: "1 cP = 0.001 Pa·s",
                    source: "CGS 단위계"
                },
                "cSt": {
                    name: "센티스토크",
                    symbol: "cSt",
                    siFactor: 0.000001,
                    offset: 0,
                    definition: "1 cSt = 1 mm²/s (동점도)",
                    source: "CGS 단위계"
                },
                "P": {
                    name: "푸아즈",
                    symbol: "P",
                    siFactor: 0.1,
                    offset: 0,
                    definition: "1 P = 0.1 Pa·s",
                    source: "CGS 단위계"
                },
                "lb·s/ft2": {
                    name: "파운드초 매제곱피트",
                    symbol: "lb·s/ft²",
                    siFactor: 47.8803,
                    offset: 0,
                    definition: "1 lb·s/ft² = 47.8803 Pa·s",
                    source: "영국 단위계"
                }
            }
        },
        
        velocity: {
            name: "속도 (Velocity)",
            dimension: [0, 1, -1, 0, 0, 0, 0], // [M, L, T, Θ, N, I, J]
            units: {
                "m/s": {
                    name: "미터 매초",
                    symbol: "m/s",
                    siFactor: 1,
                    offset: 0,
                    definition: "SI 기본 속도 단위",
                    source: "SI 기본 단위"
                },
                "ft/s": {
                    name: "피트 매초",
                    symbol: "ft/s",
                    siFactor: 0.3048,
                    offset: 0,
                    definition: "1 ft/s = 0.3048 m/s",
                    source: "영국 단위계"
                },
                "km/h": {
                    name: "킬로미터 매시간",
                    symbol: "km/h",
                    siFactor: 1000/3600,
                    offset: 0,
                    definition: "1 km/h = 0.2778 m/s",
                    source: "SI 유도 단위"
                },
                "mph": {
                    name: "마일 매시간",
                    symbol: "mph",
                    siFactor: 1609.344/3600,
                    offset: 0,
                    definition: "1 mph = 0.447 m/s",
                    source: "영국 단위계"
                }
            }
        },
        
        density: {
            name: "밀도 (Density)",
            dimension: [1, -3, 0, 0, 0, 0, 0], // [M, L, T, Θ, N, I, J]
            units: {
                "kg/m3": {
                    name: "킬로그램 매세제곱미터",
                    symbol: "kg/m³",
                    siFactor: 1,
                    offset: 0,
                    definition: "SI 기본 밀도 단위",
                    source: "SI 기본 단위"
                },
                "g/cm3": {
                    name: "그램 매세제곱센티미터",
                    symbol: "g/cm³",
                    siFactor: 1000,
                    offset: 0,
                    definition: "1 g/cm³ = 1000 kg/m³",
                    source: "CGS 단위계"
                },
                "lb/ft3": {
                    name: "파운드 매세제곱피트",
                    symbol: "lb/ft³",
                    siFactor: 16.0185,
                    offset: 0,
                    definition: "1 lb/ft³ = 16.0185 kg/m³",
                    source: "영국 단위계"
                },
                "API": {
                    name: "API 중량도",
                    symbol: "°API",
                    siFactor: 1,
                    offset: 0,
                    definition: "API = (141.5/비중) - 131.5 (60°F 기준)",
                    source: "석유 산업 표준"
                }
            }
        },
        
        temperature: {
            name: "온도 (Temperature)",
            dimension: [0, 0, 0, 1, 0, 0, 0], // [M, L, T, Θ, N, I, J]
            units: {
                "K": {
                    name: "켈빈",
                    symbol: "K",
                    siFactor: 1,
                    offset: 0,
                    definition: "SI 기본 온도 단위 (절대온도)",
                    source: "SI 기본 단위"
                },
                "C": {
                    name: "섭씨",
                    symbol: "°C",
                    siFactor: 1,
                    offset: 273.15,
                    definition: "°C = K - 273.15",
                    source: "SI 유도 단위"
                },
                "F": {
                    name: "화씨",
                    symbol: "°F",
                    siFactor: 5/9,
                    offset: 459.67,
                    definition: "°F = (9/5)K - 459.67",
                    source: "영국 단위계"
                }
            }
        },
        
        length: {
            name: "길이 (Length)",
            dimension: [0, 1, 0, 0, 0, 0, 0], // [M, L, T, Θ, N, I, J]
            units: {
                "m": {
                    name: "미터",
                    symbol: "m",
                    siFactor: 1,
                    offset: 0,
                    definition: "SI 기본 길이 단위",
                    source: "SI 기본 단위"
                },
                "cm": {
                    name: "센티미터",
                    symbol: "cm",
                    siFactor: 0.01,
                    offset: 0,
                    definition: "1 cm = 0.01 m",
                    source: "SI 유도 단위"
                },
                "mm": {
                    name: "밀리미터",
                    symbol: "mm",
                    siFactor: 0.001,
                    offset: 0,
                    definition: "1 mm = 0.001 m",
                    source: "SI 유도 단위"
                },
                "ft": {
                    name: "피트",
                    symbol: "ft",
                    siFactor: 0.3048,
                    offset: 0,
                    definition: "1 ft = 0.3048 m",
                    source: "영국 단위계"
                },
                "in": {
                    name: "인치",
                    symbol: "in",
                    siFactor: 0.0254,
                    offset: 0,
                    definition: "1 in = 0.0254 m",
                    source: "영국 단위계"
                }
            }
        },
        
        mass: {
            name: "질량 (Mass)",
            dimension: [1, 0, 0, 0, 0, 0, 0], // [M, L, T, Θ, N, I, J]
            units: {
                "kg": {
                    name: "킬로그램",
                    symbol: "kg",
                    siFactor: 1,
                    offset: 0,
                    definition: "SI 기본 질량 단위",
                    source: "SI 기본 단위"
                },
                "g": {
                    name: "그램",
                    symbol: "g",
                    siFactor: 0.001,
                    offset: 0,
                    definition: "1 g = 0.001 kg",
                    source: "SI 유도 단위"
                },
                "lb": {
                    name: "파운드",
                    symbol: "lb",
                    siFactor: 0.453592,
                    offset: 0,
                    definition: "1 lb = 0.453592 kg",
                    source: "영국 단위계"
                },
                "ton": {
                    name: "톤",
                    symbol: "t",
                    siFactor: 1000,
                    offset: 0,
                    definition: "1 t = 1000 kg",
                    source: "SI 유도 단위"
                }
            }
        },
        
        time: {
            name: "시간 (Time)",
            dimension: [0, 0, 1, 0, 0, 0, 0], // [M, L, T, Θ, N, I, J]
            units: {
                "s": {
                    name: "초",
                    symbol: "s",
                    siFactor: 1,
                    offset: 0,
                    definition: "SI 기본 시간 단위",
                    source: "SI 기본 단위"
                },
                "min": {
                    name: "분",
                    symbol: "min",
                    siFactor: 60,
                    offset: 0,
                    definition: "1 min = 60 s",
                    source: "SI 유도 단위"
                },
                "h": {
                    name: "시간",
                    symbol: "h",
                    siFactor: 3600,
                    offset: 0,
                    definition: "1 h = 3600 s",
                    source: "SI 유도 단위"
                },
                "day": {
                    name: "일",
                    symbol: "d",
                    siFactor: 86400,
                    offset: 0,
                    definition: "1 d = 86400 s",
                    source: "SI 유도 단위"
                }
            }
        },
        
        area: {
            name: "면적 (Area)",
            dimension: [0, 2, 0, 0, 0, 0, 0], // [M, L, T, Θ, N, I, J]
            units: {
                "m2": {
                    name: "제곱미터",
                    symbol: "m²",
                    siFactor: 1,
                    offset: 0,
                    definition: "SI 기본 면적 단위",
                    source: "SI 기본 단위"
                },
                "cm2": {
                    name: "제곱센티미터",
                    symbol: "cm²",
                    siFactor: 0.0001,
                    offset: 0,
                    definition: "1 cm² = 0.0001 m²",
                    source: "SI 유도 단위"
                },
                "ft2": {
                    name: "제곱피트",
                    symbol: "ft²",
                    siFactor: 0.092903,
                    offset: 0,
                    definition: "1 ft² = 0.092903 m²",
                    source: "영국 단위계"
                },
                "in2": {
                    name: "제곱인치",
                    symbol: "in²",
                    siFactor: 0.00064516,
                    offset: 0,
                    definition: "1 in² = 0.00064516 m²",
                    source: "영국 단위계"
                }
            }
        },
        
        volume: {
            name: "부피 (Volume)",
            dimension: [0, 3, 0, 0, 0, 0, 0], // [M, L, T, Θ, N, I, J]
            units: {
                "m3": {
                    name: "세제곱미터",
                    symbol: "m³",
                    siFactor: 1,
                    offset: 0,
                    definition: "SI 기본 부피 단위",
                    source: "SI 기본 단위"
                },
                "L": {
                    name: "리터",
                    symbol: "L",
                    siFactor: 0.001,
                    offset: 0,
                    definition: "1 L = 0.001 m³",
                    source: "SI 유도 단위"
                },
                "cm3": {
                    name: "세제곱센티미터",
                    symbol: "cm³",
                    siFactor: 0.000001,
                    offset: 0,
                    definition: "1 cm³ = 0.000001 m³",
                    source: "SI 유도 단위"
                },
                "ft3": {
                    name: "세제곱피트",
                    symbol: "ft³",
                    siFactor: 0.0283168,
                    offset: 0,
                    definition: "1 ft³ = 0.0283168 m³",
                    source: "영국 단위계"
                },
                "gal": {
                    name: "갤런",
                    symbol: "gal",
                    siFactor: 0.00378541,
                    offset: 0,
                    definition: "1 US gallon = 0.00378541 m³",
                    source: "미국 단위계"
                }
            }
        },
        
        energy: {
            name: "에너지 (Energy)",
            dimension: [1, 2, -2, 0, 0, 0, 0], // [M, L, T, Θ, N, I, J]
            units: {
                "J": {
                    name: "줄",
                    symbol: "J",
                    siFactor: 1,
                    offset: 0,
                    definition: "SI 기본 에너지 단위 = kg·m²/s²",
                    source: "SI 기본 단위"
                },
                "kJ": {
                    name: "킬로줄",
                    symbol: "kJ",
                    siFactor: 1000,
                    offset: 0,
                    definition: "1 kJ = 1000 J",
                    source: "SI 유도 단위"
                },
                "cal": {
                    name: "칼로리",
                    symbol: "cal",
                    siFactor: 4.184,
                    offset: 0,
                    definition: "1 cal = 4.184 J",
                    source: "CGS 단위계"
                },
                "BTU": {
                    name: "영국 열량 단위",
                    symbol: "BTU",
                    siFactor: 1055.06,
                    offset: 0,
                    definition: "1 BTU = 1055.06 J",
                    source: "영국 단위계"
                }
            }
        },
        
        power: {
            name: "동력 (Power)",
            dimension: [1, 2, -3, 0, 0, 0, 0], // [M, L, T, Θ, N, I, J]
            units: {
                "W": {
                    name: "와트",
                    symbol: "W",
                    siFactor: 1,
                    offset: 0,
                    definition: "SI 기본 동력 단위 = J/s = kg·m²/s³",
                    source: "SI 기본 단위"
                },
                "kW": {
                    name: "킬로와트",
                    symbol: "kW",
                    siFactor: 1000,
                    offset: 0,
                    definition: "1 kW = 1000 W",
                    source: "SI 유도 단위"
                },
                "hp": {
                    name: "마력",
                    symbol: "hp",
                    siFactor: 745.7,
                    offset: 0,
                    definition: "1 hp = 745.7 W",
                    source: "영국 단위계"
                }
            }
        },
        
        force: {
            name: "힘 (Force)",
            dimension: [1, 1, -2, 0, 0, 0, 0], // [M, L, T, Θ, N, I, J]
            units: {
                "N": {
                    name: "뉴턴",
                    symbol: "N",
                    siFactor: 1,
                    offset: 0,
                    definition: "SI 기본 힘 단위 = kg·m/s²",
                    source: "SI 기본 단위"
                },
                "lbf": {
                    name: "파운드힘",
                    symbol: "lbf",
                    siFactor: 4.44822,
                    offset: 0,
                    definition: "1 lbf = 4.44822 N",
                    source: "영국 단위계"
                },
                "kgf": {
                    name: "킬로그램힘",
                    symbol: "kgf",
                    siFactor: 9.80665,
                    offset: 0,
                    definition: "1 kgf = 9.80665 N",
                    source: "중력 단위계"
                }
            }
        },
        
        // UCUM v2.2에서 새로 추가된 단위들
        turbidity: {
            name: "탁도 (Turbidity)",
            dimension: [0, 0, 0, 0, 0, 0, 0], // 무차원
            units: {
                "NTU": {
                    name: "Nephelometric Turbidity Unit",
                    symbol: "NTU",
                    siFactor: 1,
                    offset: 0,
                    definition: "네펠로메트릭 탁도 단위 - UCUM v2.2 신규 추가",
                    source: "UCUM v2.2"
                },
                "FNU": {
                    name: "Formazin Turbidity Unit",
                    symbol: "FNU",
                    siFactor: 1,
                    offset: 0,
                    definition: "포르마진 탁도 단위 - UCUM v2.2 신규 추가",
                    source: "UCUM v2.2"
                },
                "FTU": {
                    name: "Formazin Turbidity Unit (Legacy)",
                    symbol: "FTU",
                    siFactor: 1,
                    offset: 0,
                    definition: "포르마진 탁도 단위 (구형)",
                    source: "수질 측정 표준"
                }
            }
        },
        
        // 화학공학 특화 단위들
        concentration: {
            name: "농도 (Concentration)",
            dimension: [-3, 0, 0, 0, 1, 0, 0], // [M, L, T, Θ, N, I, J]
            units: {
                "mol/L": {
                    name: "몰 매리터",
                    symbol: "mol/L",
                    siFactor: 1000,
                    offset: 0,
                    definition: "1 mol/L = 1000 mol/m³",
                    source: "SI 유도 단위"
                },
                "mol/m3": {
                    name: "몰 매세제곱미터",
                    symbol: "mol/m³",
                    siFactor: 1,
                    offset: 0,
                    definition: "SI 기본 농도 단위",
                    source: "SI 기본 단위"
                },
                "ppm": {
                    name: "백만분율",
                    symbol: "ppm",
                    siFactor: 1e-6,
                    offset: 0,
                    definition: "1 ppm = 1×10⁻⁶ (무차원)",
                    source: "화학 분석"
                },
                "ppb": {
                    name: "십억분율",
                    symbol: "ppb",
                    siFactor: 1e-9,
                    offset: 0,
                    definition: "1 ppb = 1×10⁻⁹ (무차원)",
                    source: "화학 분석"
                },
                "wt%": {
                    name: "중량 백분율",
                    symbol: "wt%",
                    siFactor: 0.01,
                    offset: 0,
                    definition: "1 wt% = 0.01 (무차원)",
                    source: "화학 공학"
                }
            }
        },
        
        // 열전달 관련 단위
        thermalConductivity: {
            name: "열전도도 (Thermal Conductivity)",
            dimension: [1, 1, -3, -1, 0, 0, 0], // [M, L, T, Θ, N, I, J]
            units: {
                "W/(m·K)": {
                    name: "와트 매미터켈빈",
                    symbol: "W/(m·K)",
                    siFactor: 1,
                    offset: 0,
                    definition: "SI 기본 열전도도 단위",
                    source: "SI 기본 단위"
                },
                "W/(cm·K)": {
                    name: "와트 매센티미터켈빈",
                    symbol: "W/(cm·K)",
                    siFactor: 100,
                    offset: 0,
                    definition: "1 W/(cm·K) = 100 W/(m·K)",
                    source: "SI 유도 단위"
                },
                "BTU/(ft·h·°F)": {
                    name: "BTU 매피트시간화씨",
                    symbol: "BTU/(ft·h·°F)",
                    siFactor: 1.73073,
                    offset: 0,
                    definition: "1 BTU/(ft·h·°F) = 1.73073 W/(m·K)",
                    source: "영국 단위계"
                }
            }
        }
    },
    
    // 표준 조건 정의
    standardConditions: {
        STP: {
            name: "표준 온도 압력",
            temperature: 273.15, // 0°C in K
            pressure: 101325,    // 1 atm in Pa
            description: "0°C, 1 atm"
        },
        NTP: {
            name: "정상 온도 압력",
            temperature: 293.15, // 20°C in K
            pressure: 101325,    // 1 atm in Pa
            description: "20°C, 1 atm"
        },
        SATP: {
            name: "표준 주변 온도 압력",
            temperature: 298.15, // 25°C in K
            pressure: 100000,    // 1 bar in Pa
            description: "25°C, 1 bar"
        }
    },
    
    // 물리 상수 (UCUM v2.2 기준 NIST 업데이트)
    physicalConstants: {
        g: 9.80665,                    // 중력가속도 (m/s²)
        R: 8.314462618,                // 기체상수 (J/(mol·K))
        Na: 6.02214076e23,             // 아보가드로 수 (mol⁻¹) - UCUM v2.2 업데이트
        k: 1.380649e-23,               // 볼츠만 상수 (J/K) - UCUM v2.2 업데이트
        c: 299792458,                  // 빛의 속도 (m/s)
        h: 6.62607015e-34,             // 플랑크 상수 (J·s)
        G: 6.67430e-11,                // 뉴턴 중력상수 (m³/(kg·s²)) - UCUM v2.2 업데이트
        e: 1.602176634e-19,            // 기본 전하 (C) - UCUM v2.2 업데이트
        ε0: 8.8541878128e-12,          // 진공 유전율 (F/m) - UCUM v2.2 업데이트
        μ0: 4 * Math.PI * 1e-7,        // 진공 투자율 (H/m)
        mu: 1.66053906660e-27,         // 원자질량상수 (kg) - UCUM v2.2 업데이트
        mp: 1.67262192369e-27,         // 양성자 질량 (kg) - UCUM v2.2 업데이트
        me: 9.1093837015e-31           // 전자 질량 (kg) - UCUM v2.2 업데이트
    }
};

// 차원 벡터 비교 함수
function compareDimensions(dim1, dim2) {
    if (dim1.length !== dim2.length) return false;
    return dim1.every((val, index) => val === dim2[index]);
}

// 차원 벡터를 문자열로 변환
function dimensionToString(dimension) {
    const symbols = ['M', 'L', 'T', 'Θ', 'N', 'I', 'J'];
    let result = '';
    
    for (let i = 0; i < dimension.length; i++) {
        if (dimension[i] !== 0) {
            if (result) result += '·';
            result += symbols[i];
            if (dimension[i] !== 1) {
                result += dimension[i] > 0 ? `^${dimension[i]}` : `^${dimension[i]}`;
            }
        }
    }
    
    return result || '무차원';
}

// 차원 벡터를 수학적 표기로 변환 (L^3·T^-1 형태)
function dimensionToMathString(dimension) {
    const symbols = ['M', 'L', 'T', 'Θ', 'N', 'I', 'J'];
    let result = '';
    
    for (let i = 0; i < dimension.length; i++) {
        if (dimension[i] !== 0) {
            if (result) result += '·';
            result += symbols[i];
            if (dimension[i] !== 1) {
                result += `^${dimension[i]}`;
            }
        }
    }
    
    return result || '무차원';
}

// 단위 변환 함수
function convertUnit(value, fromUnit, toUnit, physicalQuantity) {
    const quantity = unitsData.physicalQuantities[physicalQuantity];
    if (!quantity) return null;
    
    const from = quantity.units[fromUnit];
    const to = quantity.units[toUnit];
    
    if (!from || !to) return null;
    
    // 차원 검증
    if (!compareDimensions(from.dimension || quantity.dimension, to.dimension || quantity.dimension)) {
        throw new Error('차원이 일치하지 않는 단위 간 변환은 불가능합니다.');
    }
    
    // 온도 단위 특별 처리
    if (physicalQuantity === 'temperature') {
        return convertTemperature(value, fromUnit, toUnit);
    }
    
    // 일반 단위 변환
    const siValue = (value * from.siFactor) + from.offset;
    const result = (siValue - to.offset) / to.siFactor;
    
    return {
        value: result,
        fromUnit: from,
        toUnit: to,
        formula: `${value} ${from.symbol} = ${result.toFixed(6)} ${to.symbol}`,
        assumption: getAssumptionInfo(from, to, physicalQuantity)
    };
}

// 온도 단위 변환 (특별 처리)
function convertTemperature(value, fromUnit, toUnit) {
    const tempUnits = unitsData.physicalQuantities.temperature.units;
    const from = tempUnits[fromUnit];
    const to = tempUnits[toUnit];
    
    // 켈빈으로 변환
    let kelvin;
    if (fromUnit === 'K') {
        kelvin = value;
    } else if (fromUnit === 'C') {
        kelvin = value + 273.15;
    } else if (fromUnit === 'F') {
        kelvin = (value + 459.67) * 5/9;
    }
    
    // 목표 단위로 변환
    let result;
    if (toUnit === 'K') {
        result = kelvin;
    } else if (toUnit === 'C') {
        result = kelvin - 273.15;
    } else if (toUnit === 'F') {
        result = kelvin * 9/5 - 459.67;
    }
    
    return {
        value: result,
        fromUnit: from,
        toUnit: to,
        formula: `${value} ${from.symbol} = ${result.toFixed(6)} ${to.symbol}`,
        assumption: "온도 변환 (절대온도 기준)"
    };
}

// 가정 정보 생성
function getAssumptionInfo(fromUnit, toUnit, physicalQuantity) {
    let assumptions = [];
    
    // 표준 조건 관련
    if (physicalQuantity === 'flow') {
        if (fromUnit.symbol.includes('SCF') || toUnit.symbol.includes('SCF')) {
            assumptions.push("표준 조건: 60°F, 14.696 psia");
        }
        if (fromUnit.symbol.includes('NM') || toUnit.symbol.includes('NM')) {
            assumptions.push("표준 조건: 0°C, 1 atm");
        }
    }
    
    // 게이지 압력 관련
    if (physicalQuantity === 'pressure') {
        if (fromUnit.symbol.includes('g') || toUnit.symbol.includes('g')) {
            assumptions.push("게이지 압력 기준: 14.696 psia");
        }
    }
    
    // API 중량도 관련
    if (physicalQuantity === 'density' && (fromUnit.symbol === 'API' || toUnit.symbol === 'API')) {
        assumptions.push("API 중량도 기준: 60°F");
    }
    
    return assumptions.length > 0 ? assumptions.join(', ') : "표준 조건 적용";
}

// 단위 검색 함수
function searchUnits(query) {
    const results = [];
    const lowerQuery = query.toLowerCase();
    
    for (const [quantityKey, quantity] of Object.entries(unitsData.physicalQuantities)) {
        for (const [unitKey, unit] of Object.entries(quantity.units)) {
            if (unit.name.toLowerCase().includes(lowerQuery) ||
                unit.symbol.toLowerCase().includes(lowerQuery) ||
                unit.definition.toLowerCase().includes(lowerQuery)) {
                results.push({
                    quantity: quantity.name,
                    unit: unit,
                    quantityKey: quantityKey
                });
            }
        }
    }
    
    return results;
}

// 공학 계산 함수들
const engineeringCalculations = {
    // Reynolds 수 계산
    reynolds: (density, velocity, diameter, viscosity) => {
        return (density * velocity * diameter) / viscosity;
    },
    
    // 압력-헤드 변환
    pressureToHead: (pressure, density) => {
        const g = unitsData.physicalConstants.g;
        return pressure / (density * g);
    },
    
    // 열플럭스 계산
    heatFlux: (heatTransferCoeff, tempDiff) => {
        return heatTransferCoeff * tempDiff;
    },
    
    // 펌프 동력 계산
    pumpPower: (flowRate, pressureDrop, efficiency = 1) => {
        return (flowRate * pressureDrop) / efficiency;
    }
};

// 재무 계산 함수들
const financialCalculations = {
    // 복리 계산
    compoundInterest: (principal, rate, time, frequency = 1) => {
        return principal * Math.pow(1 + (rate / 100) / frequency, frequency * time);
    },
    
    // 현재가치 계산
    presentValue: (futureValue, rate, time) => {
        return futureValue / Math.pow(1 + rate / 100, time);
    },
    
    // 연금 현재가치 계산
    annuityPresentValue: (payment, rate, time) => {
        if (rate === 0) return payment * time;
        return payment * (1 - Math.pow(1 + rate / 100, -time)) / (rate / 100);
    },
    
    // 대출 상환액 계산
    loanPayment: (principal, rate, time) => {
        const monthlyRate = rate / 100 / 12;
        const months = time * 12;
        if (monthlyRate === 0) return principal / months;
        return principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / 
               (Math.pow(1 + monthlyRate, months) - 1);
    }
};
