// ChemUnit Converter - 메인 JavaScript 파일
// PRD에 따른 차원 기반 단위 변환 시스템 구현

// 전역 변수
let currentPhysicalQuantity = '';
let currentFromUnit = '';
let currentToUnit = '';
let chart = null;

// DOM 로드 완료 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// 앱 초기화
async function initializeApp() {
    // unitsData가 정의되었는지 확인
    if (typeof unitsData === 'undefined') {
        console.error('unitsData가 정의되지 않았습니다. units-data.js 파일을 확인하세요.');
        return;
    }
    
    // UCUM 데이터 로드 및 통합
    try {
        console.log('UCUM v2.2 데이터 로드 중...');
        const mergedData = await window.ucumLoader.mergeWithSystem(unitsData);
        
        // 전역 unitsData 업데이트
        Object.assign(unitsData, mergedData);
        console.log('UCUM v2.2 데이터 통합 완료');
        
        // UCUM 통계 출력
        const stats = window.ucumParser.generateStatistics(mergedData);
        console.log('UCUM 통계:', stats);
        
    } catch (error) {
        console.warn('UCUM 데이터 로드 실패, 기본 데이터 사용:', error);
    }
    
    setupTabNavigation();
    setupPhysicalQuantitySelector();
    setupUnitSelectors();
    setupConversionInputs();
    setupEngineeringCalculator();
    setupFinancialCalculator();
    setupGraphing();
    setupUnitDefinitions();
    
    console.log('ChemUnit Converter 초기화 완료');
}

// 탭 네비게이션 설정
function setupTabNavigation() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // 모든 탭 비활성화
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // 선택된 탭 활성화
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// 물리량 선택기 설정
function setupPhysicalQuantitySelector() {
    const physicalQuantitySelect = document.getElementById('physical-quantity');
    
    physicalQuantitySelect.addEventListener('change', function() {
        currentPhysicalQuantity = this.value;
        updateUnitSelectors();
        clearConversionResults();
        
        if (currentPhysicalQuantity) {
            const quantity = unitsData.physicalQuantities[currentPhysicalQuantity];
            displayDimensionInfo(quantity);
        }
    });
}

// 단위 선택기 업데이트
function updateUnitSelectors() {
    const fromUnitSelect = document.getElementById('from-unit');
    const toUnitSelect = document.getElementById('to-unit');
    
    // unitsData가 정의되었는지 확인
    if (typeof unitsData === 'undefined') {
        console.error('unitsData가 정의되지 않았습니다.');
        return;
    }
    
    // 기존 옵션 제거
    fromUnitSelect.innerHTML = '<option value="">단위를 선택하세요</option>';
    toUnitSelect.innerHTML = '<option value="">단위를 선택하세요</option>';
    
    if (!currentPhysicalQuantity) {
        fromUnitSelect.disabled = true;
        toUnitSelect.disabled = true;
        return;
    }
    
    const quantity = unitsData.physicalQuantities[currentPhysicalQuantity];
    const units = quantity.units;
    
    // 옵션 추가
    Object.entries(units).forEach(([key, unit]) => {
        const option1 = new Option(`${unit.symbol} - ${unit.name}`, key);
        const option2 = new Option(`${unit.symbol} - ${unit.name}`, key);
        fromUnitSelect.add(option1);
        toUnitSelect.add(option2);
    });
    
    fromUnitSelect.disabled = false;
    toUnitSelect.disabled = false;
}

// 단위 선택기 이벤트 설정
function setupUnitSelectors() {
    const fromUnitSelect = document.getElementById('from-unit');
    const toUnitSelect = document.getElementById('to-unit');
    
    fromUnitSelect.addEventListener('change', function() {
        currentFromUnit = this.value;
        updateConversionInputs();
        if (document.getElementById('from-value').value) {
            performConversion();
        }
    });
    
    toUnitSelect.addEventListener('change', function() {
        currentToUnit = this.value;
        updateConversionInputs();
        if (document.getElementById('from-value').value) {
            performConversion();
        }
    });
}

// 변환 입력 필드 설정
function setupConversionInputs() {
    const fromValueInput = document.getElementById('from-value');
    const toValueInput = document.getElementById('to-value');
    const swapButton = document.getElementById('swap-units');
    
    fromValueInput.addEventListener('input', performConversion);
    
    swapButton.addEventListener('click', function() {
        if (currentFromUnit && currentToUnit) {
            // 단위 교체
            const tempUnit = currentFromUnit;
            currentFromUnit = currentToUnit;
            currentToUnit = tempUnit;
            
            // UI 업데이트
            document.getElementById('from-unit').value = currentFromUnit;
            document.getElementById('to-unit').value = currentToUnit;
            
            // 값 교체
            const fromValue = fromValueInput.value;
            const toValue = toValueInput.value;
            
            if (fromValue && toValue) {
                fromValueInput.value = toValue;
                toValueInput.value = fromValue;
            }
            
            performConversion();
        }
    });
}

// 변환 입력 필드 업데이트
function updateConversionInputs() {
    const fromValueInput = document.getElementById('from-value');
    const toValueInput = document.getElementById('to-value');
    
    if (currentFromUnit && currentToUnit) {
        fromValueInput.disabled = false;
        fromValueInput.placeholder = '값을 입력하세요';
    } else {
        fromValueInput.disabled = true;
        fromValueInput.placeholder = '먼저 단위를 선택하세요';
    }
}

// 단위 변환 수행
function performConversion() {
    const fromValueInput = document.getElementById('from-value');
    const toValueInput = document.getElementById('to-value');
    const fromValue = parseFloat(fromValueInput.value);
    
    if (!fromValue || !currentFromUnit || !currentToUnit || !currentPhysicalQuantity) {
        toValueInput.value = '';
        return;
    }
    
    try {
        const result = convertUnit(fromValue, currentFromUnit, currentToUnit, currentPhysicalQuantity);
        
        if (result) {
            toValueInput.value = result.value.toFixed(6);
            displayConversionFormula(result);
            displayAssumptionInfo(result);
        } else {
            throw new Error('변환 결과를 계산할 수 없습니다.');
        }
    } catch (error) {
        console.error('변환 오류:', error);
        toValueInput.value = '오류';
        displayError(error.message);
    }
}

// 차원 정보 표시
function displayDimensionInfo(quantity) {
    const dimensionDisplay = document.getElementById('dimension-display');
    const dimensionString = dimensionToMathString(quantity.dimension);
    
    dimensionDisplay.innerHTML = `
        <h4>차원 정보</h4>
        <p><strong>물리량:</strong> ${quantity.name}</p>
        <p><strong>차원:</strong> [${dimensionString}]</p>
    `;
}

// 변환 공식 표시
function displayConversionFormula(result) {
    const formulaDisplay = document.getElementById('conversion-formula');
    formulaDisplay.innerHTML = `
        <h4>변환 공식</h4>
        <p><code>${result.formula}</code></p>
    `;
}

// 가정 정보 표시
function displayAssumptionInfo(result) {
    const assumptionDisplay = document.getElementById('assumption-display');
    assumptionDisplay.innerHTML = `
        <p><strong>적용된 가정:</strong> ${result.assumption}</p>
    `;
}

// 오류 표시
function displayError(message) {
    const formulaDisplay = document.getElementById('conversion-formula');
    formulaDisplay.innerHTML = `
        <div class="error">
            <strong>오류:</strong> ${message}
        </div>
    `;
}

// 변환 결과 초기화
function clearConversionResults() {
    document.getElementById('from-value').value = '';
    document.getElementById('to-value').value = '';
    document.getElementById('conversion-formula').innerHTML = '';
    document.getElementById('assumption-display').innerHTML = '';
}

// 공학 계산기 설정
function setupEngineeringCalculator() {
    // 기본 계산기 기능은 이미 HTML에 onclick으로 연결됨
    setupCalcGraph();
    setupCalculatorKeyboard();
}

// 계산기 내 그래프 설정
function setupCalcGraph() {
    const ctx = document.getElementById('calc-function-chart').getContext('2d');
    window.calcChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'f(x)',
                data: [],
                borderColor: 'rgb(52, 152, 219)',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                borderWidth: 2,
                fill: false,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'linear',
                    position: 'center'
                },
                y: {
                    type: 'linear',
                    position: 'center'
                }
            },
            plugins: {
                legend: {
                    display: true
                }
            }
        }
    });
}

// 기본 계산기 함수들
let calcDisplay = '';
let calcResult = 0;

function appendToCalc(value) {
    calcDisplay += value;
    document.getElementById('calc-display').value = calcDisplay;
}

function clearCalc() {
    calcDisplay = '';
    calcResult = 0;
    document.getElementById('calc-display').value = '';
}

function deleteLast() {
    calcDisplay = calcDisplay.slice(0, -1);
    document.getElementById('calc-display').value = calcDisplay;
}

function calculateResult() {
    try {
        // 수학 표현식 계산 (math.js 사용)
        // 미적분 및 고급 함수 지원
        let expression = calcDisplay;
        
        // 미적분 함수 변환
        expression = expression.replace(/∫/g, 'integrate');
        expression = expression.replace(/∂/g, 'derivative');
        expression = expression.replace(/lim/g, 'limit');
        expression = expression.replace(/∑/g, 'sum');
        expression = expression.replace(/∏/g, 'prod');
        
        calcResult = math.evaluate(expression);
        calcDisplay = calcResult.toString();
        document.getElementById('calc-display').value = calcDisplay;
    } catch (error) {
        document.getElementById('calc-display').value = '오류';
        calcDisplay = '';
    }
}

// 키보드 입력 지원
function setupCalculatorKeyboard() {
    const calcDisplay = document.getElementById('calc-display');
    
    calcDisplay.addEventListener('keydown', function(e) {
        // Enter 키로 계산
        if (e.key === 'Enter') {
            e.preventDefault();
            calculateResult();
        }
        
        // Escape 키로 클리어
        if (e.key === 'Escape') {
            e.preventDefault();
            clearCalc();
        }
        
        // Backspace 키로 삭제
        if (e.key === 'Backspace') {
            e.preventDefault();
            deleteLast();
        }
        
        // 허용된 키들
        const allowedKeys = /^[0-9+\-*/().\s]$/;
        const functionKeys = /^(sin|cos|tan|log|ln|sqrt|abs|exp|pi|e)$/;
        
        if (!allowedKeys.test(e.key) && !functionKeys.test(e.key) && 
            !['Enter', 'Escape', 'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)) {
            e.preventDefault();
        }
    });
    
    // 실시간 입력 처리
    calcDisplay.addEventListener('input', function(e) {
        calcDisplay = e.target.value;
    });
}

function sendToConverter() {
    if (calcResult !== 0) {
        document.getElementById('from-value').value = calcResult;
        performConversion();
        
        // 변환기 탭으로 전환
        document.querySelector('[data-tab="converter"]').click();
    }
}

// 공학 계산 함수들
function calculateReynolds() {
    const density = parseFloat(document.getElementById('reynolds-density').value);
    const velocity = parseFloat(document.getElementById('reynolds-velocity').value);
    const diameter = parseFloat(document.getElementById('reynolds-diameter').value);
    const viscosity = parseFloat(document.getElementById('reynolds-viscosity').value);
    
    if (density && velocity && diameter && viscosity) {
        const re = engineeringCalculations.reynolds(density, velocity, diameter, viscosity);
        document.getElementById('reynolds-result').innerHTML = `
            <strong>Reynolds 수:</strong> ${re.toFixed(2)}<br>
            <small>Re = ρvD/μ = ${density} × ${velocity} × ${diameter} / ${viscosity}</small>
        `;
    }
}

function calculateHead() {
    const pressure = parseFloat(document.getElementById('pressure-diff').value);
    const density = parseFloat(document.getElementById('fluid-density').value);
    
    if (pressure && density) {
        const head = engineeringCalculations.pressureToHead(pressure, density);
        document.getElementById('head-result').innerHTML = `
            <strong>헤드:</strong> ${head.toFixed(2)} m<br>
            <small>H = ΔP/(ρg) = ${pressure} / (${density} × 9.81)</small>
        `;
    }
}

function calculateHeatFlux() {
    const htc = parseFloat(document.getElementById('heat-transfer-coeff').value);
    const tempDiff = parseFloat(document.getElementById('temp-diff').value);
    
    if (htc && tempDiff) {
        const flux = engineeringCalculations.heatFlux(htc, tempDiff);
        document.getElementById('heat-flux-result').innerHTML = `
            <strong>열플럭스:</strong> ${flux.toFixed(2)} W/m²<br>
            <small>q = hΔT = ${htc} × ${tempDiff}</small>
        `;
    }
}

function calculatePumpPower() {
    const flowRate = parseFloat(document.getElementById('flow-rate').value);
    const pressureDrop = parseFloat(document.getElementById('pressure-drop').value);
    const efficiency = parseFloat(document.getElementById('efficiency').value) || 1;
    
    if (flowRate && pressureDrop) {
        const power = engineeringCalculations.pumpPower(flowRate, pressureDrop, efficiency);
        document.getElementById('pump-power-result').innerHTML = `
            <strong>펌프 동력:</strong> ${power.toFixed(2)} W<br>
            <small>P = QΔP/η = ${flowRate} × ${pressureDrop} / ${efficiency}</small>
        `;
    }
}

// Steam Pressure 계산
function calculateSteamPressure() {
    const density = parseFloat(document.getElementById('steam-density').value);
    const velocity = parseFloat(document.getElementById('steam-velocity').value);
    const height = parseFloat(document.getElementById('steam-height').value);
    
    if (density && velocity !== undefined && height !== undefined) {
        const g = 9.81; // 중력가속도
        const dynamicPressure = 0.5 * density * velocity * velocity;
        const hydrostaticPressure = density * g * height;
        const totalPressure = dynamicPressure + hydrostaticPressure;
        
        document.getElementById('steam-pressure-result').innerHTML = `
            <strong>동압력:</strong> ${dynamicPressure.toFixed(2)} Pa<br>
            <strong>정압력:</strong> ${hydrostaticPressure.toFixed(2)} Pa<br>
            <strong>총 압력:</strong> ${totalPressure.toFixed(2)} Pa<br>
            <small>P = ½ρv² + ρgh</small>
        `;
    }
}

// Mixture Density 계산
function calculateMixtureDensity() {
    const frac1 = parseFloat(document.getElementById('comp1-fraction').value);
    const density1 = parseFloat(document.getElementById('comp1-density').value);
    const frac2 = parseFloat(document.getElementById('comp2-fraction').value);
    const density2 = parseFloat(document.getElementById('comp2-density').value);
    
    if (frac1 && density1 && frac2 && density2) {
        // 몰분율 기반 밀도 계산 (단순 가중평균)
        const mixtureDensity = (frac1 * density1 + frac2 * density2) / (frac1 + frac2);
        
        document.getElementById('mixture-density-result').innerHTML = `
            <strong>혼합물 밀도:</strong> ${mixtureDensity.toFixed(2)} kg/m³<br>
            <small>ρ_mix = (x₁ρ₁ + x₂ρ₂) / (x₁ + x₂)</small><br>
            <small>성분1: ${frac1} × ${density1} = ${(frac1 * density1).toFixed(2)}</small><br>
            <small>성분2: ${frac2} × ${density2} = ${(frac2 * density2).toFixed(2)}</small>
        `;
    }
}

// Heat Transfer Coefficient 계산
function calculateHeatTransferCoeff() {
    const nu = parseFloat(document.getElementById('nusselt-number').value);
    const k = parseFloat(document.getElementById('thermal-conductivity').value);
    const L = parseFloat(document.getElementById('characteristic-length').value);
    
    if (nu && k && L) {
        const h = (nu * k) / L;
        
        document.getElementById('heat-transfer-coeff-result').innerHTML = `
            <strong>열전달계수:</strong> ${h.toFixed(2)} W/m²·K<br>
            <small>h = Nu × k / L = ${nu} × ${k} / ${L}</small>
        `;
    }
}

// 계산기 내 그래프 그리기
function plotCalcFunction() {
    const expression = document.getElementById('calc-function-expression').value;
    const xMin = parseFloat(document.getElementById('calc-x-min').value);
    const xMax = parseFloat(document.getElementById('calc-x-max').value);
    
    if (!expression || !window.calcChart) {
        alert('함수를 입력해주세요.');
        return;
    }
    
    try {
        const data = [];
        const step = (xMax - xMin) / 100; // 100개 점으로 그래프 생성
        
        for (let x = xMin; x <= xMax; x += step) {
            try {
                const expr = expression.replace(/x/g, `(${x})`);
                const y = math.evaluate(expr);
                
                if (isFinite(y)) {
                    data.push({x: x, y: y});
                }
            } catch (e) {
                continue;
            }
        }
        
        window.calcChart.data.datasets[0].data = data;
        window.calcChart.data.datasets[0].label = `f(x) = ${expression}`;
        window.calcChart.options.scales.x.min = xMin;
        window.calcChart.options.scales.x.max = xMax;
        window.calcChart.update();
        
    } catch (error) {
        alert('함수 계산 중 오류가 발생했습니다: ' + error.message);
    }
}

// 재무 계산기 설정
function setupFinancialCalculator() {
    // 재무 계산 함수들은 이미 HTML에 onclick으로 연결됨
    setupFinancialCharts();
    generateAnnuityTable();
}

// 재무 계산 함수들
function calculateCompoundInterest() {
    const principal = parseFloat(document.getElementById('principal').value);
    const rate = parseFloat(document.getElementById('interest-rate').value);
    const time = parseFloat(document.getElementById('time-period').value);
    const frequency = parseFloat(document.getElementById('compounding-frequency').value) || 1;
    
    if (principal && rate && time) {
        const result = financialCalculations.compoundInterest(principal, rate, time, frequency);
        const interest = result - principal;
        document.getElementById('compound-result').innerHTML = `
            <strong>최종 금액:</strong> ${result.toLocaleString()}원<br>
            <strong>이자:</strong> ${interest.toLocaleString()}원<br>
            <small>원금: ${principal.toLocaleString()}원, 연이율: ${rate}%, 기간: ${time}년</small>
        `;
        
        // 복리 그래프 생성
        plotCompoundInterestChart(principal, rate, time, frequency);
    }
}

function calculatePresentValue() {
    const futureValue = parseFloat(document.getElementById('future-value').value);
    const rate = parseFloat(document.getElementById('discount-rate').value);
    const time = parseFloat(document.getElementById('pv-periods').value);
    
    if (futureValue && rate && time) {
        const result = financialCalculations.presentValue(futureValue, rate, time);
        document.getElementById('pv-result').innerHTML = `
            <strong>현재가치:</strong> ${result.toLocaleString()}원<br>
            <small>미래가치: ${futureValue.toLocaleString()}원, 할인율: ${rate}%, 기간: ${time}년</small>
        `;
    }
}

function calculateAnnuityPV() {
    const payment = parseFloat(document.getElementById('annuity-payment').value);
    const rate = parseFloat(document.getElementById('annuity-rate').value);
    const time = parseFloat(document.getElementById('annuity-periods').value);
    
    if (payment && rate && time) {
        const result = financialCalculations.annuityPresentValue(payment, rate, time);
        document.getElementById('annuity-pv-result').innerHTML = `
            <strong>연금 현재가치:</strong> ${result.toLocaleString()}원<br>
            <small>연금 지급액: ${payment.toLocaleString()}원, 이율: ${rate}%, 기간: ${time}년</small>
        `;
    }
}

function calculateLoanPayment() {
    const amount = parseFloat(document.getElementById('loan-amount').value);
    const rate = parseFloat(document.getElementById('loan-rate').value);
    const time = parseFloat(document.getElementById('loan-term').value);
    
    if (amount && rate && time) {
        const monthlyPayment = financialCalculations.loanPayment(amount, rate, time);
        const totalPayment = monthlyPayment * time * 12;
        const totalInterest = totalPayment - amount;
        document.getElementById('loan-result').innerHTML = `
            <strong>월 상환액:</strong> ${monthlyPayment.toLocaleString()}원<br>
            <strong>총 상환액:</strong> ${totalPayment.toLocaleString()}원<br>
            <strong>총 이자:</strong> ${totalInterest.toLocaleString()}원<br>
            <small>대출금액: ${amount.toLocaleString()}원, 연이율: ${rate}%, 상환기간: ${time}년</small>
        `;
        
        // 대출 상환 그래프 생성
        plotLoanPaymentChart(amount, rate, time);
    }
}

// 재무 계산기 차트 설정
function setupFinancialCharts() {
    // 복리 차트
    const compoundCtx = document.getElementById('compound-chart').getContext('2d');
    window.compoundChart = new Chart(compoundCtx, {
        type: 'line',
        data: { labels: [], datasets: [] },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: true } }
        }
    });
    
    // 현재가치 차트
    const pvCtx = document.getElementById('pv-chart').getContext('2d');
    window.pvChart = new Chart(pvCtx, {
        type: 'line',
        data: { labels: [], datasets: [] },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: true } }
        }
    });
    
    // 연금 차트
    const annuityCtx = document.getElementById('annuity-chart').getContext('2d');
    window.annuityChart = new Chart(annuityCtx, {
        type: 'line',
        data: { labels: [], datasets: [] },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: true } }
        }
    });
    
    // 대출 차트
    const loanCtx = document.getElementById('loan-chart').getContext('2d');
    window.loanChart = new Chart(loanCtx, {
        type: 'line',
        data: { labels: [], datasets: [] },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: true } }
        }
    });
}

// 복리 그래프 그리기
function plotCompoundInterestChart(principal, rate, time, frequency) {
    const data = [];
    const labels = [];
    
    for (let year = 0; year <= time; year++) {
        const value = financialCalculations.compoundInterest(principal, rate, year, frequency);
        data.push(value);
        labels.push(`${year}년`);
    }
    
    window.compoundChart.data = {
        labels: labels,
        datasets: [{
            label: '복리 성장',
            data: data,
            borderColor: 'rgb(49, 130, 206)',
            backgroundColor: 'rgba(49, 130, 206, 0.1)',
            tension: 0.1
        }]
    };
    window.compoundChart.update();
}

// 대출 상환 그래프 그리기
function plotLoanPaymentChart(amount, rate, time) {
    const data = [];
    const labels = [];
    const monthlyRate = rate / 100 / 12;
    const months = time * 12;
    let remainingBalance = amount;
    
    for (let month = 0; month <= months; month++) {
        data.push(remainingBalance);
        labels.push(`${month}개월`);
        
        if (month < months) {
            const interestPayment = remainingBalance * monthlyRate;
            const principalPayment = financialCalculations.loanPayment(amount, rate, time) - interestPayment;
            remainingBalance -= principalPayment;
        }
    }
    
    window.loanChart.data = {
        labels: labels,
        datasets: [{
            label: '잔여 대출금',
            data: data,
            borderColor: 'rgb(229, 62, 62)',
            backgroundColor: 'rgba(229, 62, 62, 0.1)',
            tension: 0.1
        }]
    };
    window.loanChart.update();
}

// 연금 현재가치표 생성
function generateAnnuityTable() {
    const tableBody = document.getElementById('annuity-table-body');
    const rates = [3, 5, 7, 10];
    
    let html = '';
    for (let period = 1; period <= 30; period++) {
        html += '<tr>';
        html += `<td>${period}</td>`;
        
        rates.forEach(rate => {
            const pv = financialCalculations.annuityPresentValue(1, rate, period);
            html += `<td>${pv.toFixed(4)}</td>`;
        });
        
        html += '</tr>';
    }
    
    tableBody.innerHTML = html;
}

// 그래프 기능 설정
function setupGraphing() {
    const ctx = document.getElementById('function-chart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: '함수',
                data: [],
                borderColor: 'rgb(102, 126, 234)',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                borderWidth: 2,
                fill: false,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'linear',
                    position: 'center'
                },
                y: {
                    type: 'linear',
                    position: 'center'
                }
            },
            plugins: {
                legend: {
                    display: true
                }
            }
        }
    });
}

// 함수 그래프 그리기
function plotFunction() {
    const expression = document.getElementById('function-expression').value;
    const xMin = parseFloat(document.getElementById('x-min').value);
    const xMax = parseFloat(document.getElementById('x-max').value);
    const yMin = parseFloat(document.getElementById('y-min').value);
    const yMax = parseFloat(document.getElementById('y-max').value);
    
    if (!expression) {
        alert('함수를 입력해주세요.');
        return;
    }
    
    try {
        const data = [];
        const labels = [];
        const step = (xMax - xMin) / 200; // 200개 점으로 그래프 생성
        
        for (let x = xMin; x <= xMax; x += step) {
            try {
                // x를 math.js 표현식에 대입
                const expr = expression.replace(/x/g, `(${x})`);
                const y = math.evaluate(expr);
                
                if (isFinite(y) && y >= yMin && y <= yMax) {
                    data.push({x: x, y: y});
                    labels.push(x.toFixed(2));
                }
            } catch (e) {
                // 해당 점에서 계산 오류 시 건너뛰기
                continue;
            }
        }
        
        chart.data.datasets[0].data = data;
        chart.data.datasets[0].label = `f(x) = ${expression}`;
        chart.options.scales.x.min = xMin;
        chart.options.scales.x.max = xMax;
        chart.options.scales.y.min = yMin;
        chart.options.scales.y.max = yMax;
        chart.update();
        
    } catch (error) {
        alert('함수 계산 중 오류가 발생했습니다: ' + error.message);
    }
}

// 그래프 지우기
function clearGraph() {
    chart.data.datasets[0].data = [];
    chart.data.datasets[0].label = '함수';
    chart.update();
}

// 함수 예시 설정
function setFunction(expression) {
    document.getElementById('function-expression').value = expression;
    plotFunction();
}

// 단위 정의 기능 설정
function setupUnitDefinitions() {
    const searchInput = document.getElementById('unit-search');
    const definitionsContainer = document.getElementById('unit-definitions');
    
    // 초기 단위 정의 표시
    displayAllUnitDefinitions();
    
    searchInput.addEventListener('input', function() {
        const query = this.value.trim();
        if (query) {
            searchAndDisplayUnits(query);
        } else {
            displayAllUnitDefinitions();
        }
    });
}

// 모든 단위 정의 표시
function displayAllUnitDefinitions() {
    const definitionsContainer = document.getElementById('unit-definitions');
    
    // unitsData가 정의되었는지 확인
    if (typeof unitsData === 'undefined') {
        definitionsContainer.innerHTML = '<p>단위 데이터를 로드하는 중입니다...</p>';
        return;
    }
    
    let html = '';
    
    for (const [quantityKey, quantity] of Object.entries(unitsData.physicalQuantities)) {
        html += `<h3>${quantity.name}</h3>`;
        
        for (const [unitKey, unit] of Object.entries(quantity.units)) {
            html += `
                <div class="unit-definition-card">
                    <h4>${unit.symbol} - ${unit.name}</h4>
                    <p><strong>정의:</strong> ${unit.definition}</p>
                    <p><strong>출처:</strong> ${unit.source}</p>
                    <p><strong>차원:</strong> [${dimensionToString(quantity.dimension)}]</p>
                </div>
            `;
        }
    }
    
    definitionsContainer.innerHTML = html;
}

// 단위 검색 및 표시
function searchAndDisplayUnits(query) {
    const results = searchUnits(query);
    const definitionsContainer = document.getElementById('unit-definitions');
    
    if (results.length === 0) {
        definitionsContainer.innerHTML = '<p>검색 결과가 없습니다.</p>';
        return;
    }
    
    let html = `<h3>검색 결과: "${query}"</h3>`;
    
    results.forEach(result => {
        html += `
            <div class="unit-definition-card">
                <h4>${result.unit.symbol} - ${result.unit.name}</h4>
                <p><strong>물리량:</strong> ${result.quantity}</p>
                <p><strong>정의:</strong> ${result.unit.definition}</p>
                <p><strong>출처:</strong> ${result.unit.source}</p>
            </div>
        `;
    });
    
    definitionsContainer.innerHTML = html;
}

// 유틸리티 함수들
function formatNumber(num, decimals = 6) {
    return parseFloat(num).toFixed(decimals);
}

function validateInput(value, min = null, max = null) {
    const num = parseFloat(value);
    if (isNaN(num)) return false;
    if (min !== null && num < min) return false;
    if (max !== null && num > max) return false;
    return true;
}

// 키보드 단축키
document.addEventListener('keydown', function(e) {
    // Enter 키로 변환 수행
    if (e.key === 'Enter' && e.target.id === 'from-value') {
        performConversion();
    }
    
    // Ctrl + Enter로 계산기 결과 전송
    if (e.ctrlKey && e.key === 'Enter' && document.getElementById('calc-display').value) {
        sendToConverter();
    }
});

// 에러 핸들링
window.addEventListener('error', function(e) {
    console.error('JavaScript 오류:', e.error);
    // 사용자에게 친화적인 오류 메시지 표시
    if (e.error && e.error.message) {
        alert('오류가 발생했습니다: ' + e.error.message);
    }
});

// 앱 상태 저장 (로컬 스토리지)
function saveAppState() {
    const state = {
        physicalQuantity: currentPhysicalQuantity,
        fromUnit: currentFromUnit,
        toUnit: currentToUnit,
        fromValue: document.getElementById('from-value').value
    };
    localStorage.setItem('chemUnitConverterState', JSON.stringify(state));
}

function loadAppState() {
    const saved = localStorage.getItem('chemUnitConverterState');
    if (saved) {
        const state = JSON.parse(saved);
        if (state.physicalQuantity) {
            document.getElementById('physical-quantity').value = state.physicalQuantity;
            currentPhysicalQuantity = state.physicalQuantity;
            updateUnitSelectors();
            
            if (state.fromUnit) {
                document.getElementById('from-unit').value = state.fromUnit;
                currentFromUnit = state.fromUnit;
            }
            
            if (state.toUnit) {
                document.getElementById('to-unit').value = state.toUnit;
                currentToUnit = state.toUnit;
            }
            
            if (state.fromValue) {
                document.getElementById('from-value').value = state.fromValue;
                performConversion();
            }
        }
    }
}

// 페이지 언로드 시 상태 저장
window.addEventListener('beforeunload', saveAppState);

// 페이지 로드 시 상태 복원
window.addEventListener('load', loadAppState);
