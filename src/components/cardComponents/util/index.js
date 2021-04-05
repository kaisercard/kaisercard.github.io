import rr from 'react-string-replace';

export const RRC = (str, card_data = {}, options = {}) => {
    let count = 0;
    const textSize =
        card_data.body_text_size || options.default_body_text_size || '8';

    str = rr(str, /\*\*\*([^\*]+)\*\*\*/g, (match, i) => (
        <strong key={match + count++}>
            <em>{match}</em>
        </strong>
    ));

    str = rr(str, /\*\*([^\*]+)\*\*/g, (match, i) => (
        <strong key={match + count++}>{match}</strong>
    ));

    str = rr(str, /\*([^\*]+)\*/g, (match, i) => (
        <em key={match + count++}>{match}</em>
    ));

    str = rr(str, '---', (match, i) => (
        <span key={match + count++}> &mdash; </span>
    ));

    str = rr(str, '--', (match, i) => (
        <span key={match + count++}> &ndash; </span>
    ));

    str = rr(str, '<br>', (match, i) => (
        <span key={match + count++}>
            <br />
        </span>
    ));

    str = rr(str, '<br/>', (match, i) => (
        <span key={match + count++}>
            <br />
        </span>
    ));

    str = rr(str, '^^', (match, i) => (
        <span key={match + count++}>
            <br />
        </span>
    ));

    str = rr(str, "[[one-action]]", (match, i) => (
        <img
            key={match + count++}
            className='card-pfaction'
            style={{ height: textSize + 'pt' }}
            src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAQCAYAAADJViUEAAAABHNCSVQICAgIfAhkiAAAAdNJREFUKJGNUz1vE0EQnd3Z27vbu5hgGzuXQ8EoKRAUiI8mQqKgQOmQKKjoEB0NDQ2BlgqJFkWiiGgSFEQqKBBCQuJv4Arh+GKUs3fXDnceihAUX86IV76ZNx+aeQBTIISozTWarxBxdlpOKRCxshCf/rp4pkXxXPSZcx6W5hUJzrmKo2hbCuf6nwlanude1tpsEVA2VcwYE3E0/8Z1nJWjvCPEkivleW3MOwDI/zY6mkRE4zzP2gBAxYmU799u1OtrjDFR7Mzr1dpqluftvTTdVMpfECguFQtIR14UwmloY94DACEAsHq19uzEzMxqGKgVbe3WXppuKBWcE4gXigVcKa8IgYGx9iPWTlafzlYqjwGAccZPBb66MTBmI+33N8MwvIqcLxX0zJXuMuecOABN7Mc59xhjEuj43kWgHQ6/IKLvue61MdG3750fN39lWSeO5l9LIW6VaCgd9J8nvd4TBAAw1n4SAtnuz96j0f5+O46iNU/Ku2Xd+lq/7O4mDwGAWCHGo2bzhfL8BwBQjMHA6PWdJLlHdPAsE3dmjCGiaJUJjbVvd5Lk/qEQ4Ph7jgdabweBWkaOZw9JOxp+6HS7d4hoVLbKBP7XGFNxYMnGPy35G5THnjF7a0U6AAAAAElFTkSuQmCC'
        />
    ));

    str = rr(str, "[[two-action]]", (match, i) => (
        <img
            key={match + count++}
            className='card-pfaction'
            style={{ height: textSize + 'pt' }}
            src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAQCAYAAAAMJL+VAAAABHNCSVQICAgIfAhkiAAAAuFJREFUOI2NlEtoU0EUhs+dmTv3nebdeJu21qoVBKlSK4qKIIJQxTcUXSjiRlBw48rHzr1LxS5atBSlVfEJakVduBNEEFy40tomaROT2/tM6h0XWrlNbzD/bs588//nnMUANBDGWNEzmRuEkEwjJiCuCWaJudyRzT7t7lzJOrPtHwnGyUZsMpE4o7dmRjiOI6Fe9QWEEM2u0O/yhOz7e84osrLbtK17jDE3yMZj8eOxSMsQIWSjQIUO07Ie/S8AZfW2UUrIIQiMjRHSZUneaVrWOGPMAwCIRaNHE9HobcYYDwDA83yvQGnatK3nAMAaTiCJwg7K036o2yvGuF2WpC2mbU0wxhayuj7GfKYHGcrzm3meKJZtv6oPQKlk8jJjrFCuVO4IAs1Snt9UH04w7pIlqc+0rXHTNO9HItp+AEgEGYHSbYRgajvO5GIAl0okrkVU7YqmqAccz31UMYxRKgidlPC9ISHdkihuKBvGsO04DyOqdhAAoktDhO0YY992nHc4GU9cbdG0SwCAAKBFU5QB23XGDcMYEwVxHU/I+mUhhPSIgthTNoxhx3WfqKp6lAPQAggnCsIuhJCBKKVa/b6bEAPuzxtKaTdCKBbCuJ7nfcamZU2KohTnCelnAN+nC/k9Vc+bak2nb8mSdCLM3fW8JzP5/KCmqtvTieQDxphch3iF4tygaVnPMAAw07JeCKIozJWKF13X/ZpJp28qknw6zNyrVV/O5PJHVEXpa02mHjPGtDqkOlsqnpw3zQmA5atBranUdVVWzoXcgVervp7O5Q74vm+tWdX9xf/1a+3SvbGFYunnqcq8MfrPsN5EkqTVYZ1Xa7X307ncId/3TQBgP3IzxziOmw0gfqlcPhs0Dwvwv01NHfYZexMs1hYWPkzncwO+7xuLNdu2P83MFvZyiCsBgF+qlC+UK5WhsOaWCWOsdXV0vm3ms1NVdWs8FjvflHFQhJCWrN420uR33VC/Aa8NFknPxGqgAAAAAElFTkSuQmCC'
        />
    ));

    str = rr(str, "[[three-action]]", (match, i) => (
        <img
            key={match + count++}
            className='card-pfaction'
            style={{ height: textSize + 'pt' }}
            src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAQCAYAAAB3AH1ZAAAABHNCSVQICAgIfAhkiAAAA8BJREFUSImdlUlsHEUUht/rWrp6lp7unnHPjJ2MgxNWgyKWA6AEC5BsQUBRpCAOKBcIAoGPIG7ABS4sEgpwgguXnBIPxgbFCOUQcQBFiVgiDnC3PYsjHHdVLzNdXGxr0p6QOP/x1d/1Vb3X7xXADYSI1HPcDznjB27kGbTfgmdXIhXPOzXRGE8bY2N/M8YmbmRkjO2tV2sLlNK9twMyhsXKrvuRXSi+iYjIKDtQH/EXGWONrJFSWqv71XM5IY7U/eoPhJD6MAgiskK+8NIwHskGPMf9wLHttxBxO62EkIolrGml1Hyapuub8OqoX/2RMTa56fFzljUdSHlGax0MwkfK5a/cUuk9NIycCsOf/jcD/X7/H611ko1zxiZrI/4ipbQKAFAsFF5kjN1/vYc/UPer3xNCKlv8ilf+spgvnEBEwynab7uO8z4M/DPbGSgV7dcBQQVSLmnQbWGaM4h4XYYIIVVLiCelUk2p5HnKqGNy/uighxIyKkwxFUh5Vmsd5S3rOc75Q7gpYZqHAbAfRuGF7QOUbHu27LmfFXL5YzJUC1LKJQC4KoSYRkRjJ8A8LJVqbgTBt4wz32T8kcFbUUr3WEIcCqQ8I5VqUkoanPGDA4eY0hrCMIp+JnaxeLLieacQkBqIdj6Xe14p9V2g5DkEDCwhZrLloJTuEab5uFTqbBAETcbYHZzxgxlPQ5jmY0EQnJZKzXPO7uGMTwIAIKJhCfFUmqZdA3b2MAcAsVXDLBwAQGutt5YMwygwxu4cZot7yZVU65AQUuaU3Z3Z41oUJ5dJFMeXUq2vWpaYTvtpZ7m1OhMnyZ+OXZp1HefjbAm01jqK419W2q2jWut4tFpbMDk/lIWvb1z7uttdm6WEVmq+v2hy/uDWYpqm6yvt1rEwCi9QAIB/19c/B4B+GEa/xnH8e8m2X3NLpU8NRJqFx0lyabXTPqq1VnW/2jQ5fyLr2ZDBN521tTcAQdf8kTmT84e34TrdWOm0j6swPA8w0AVRFF3s9/vLpaL9suc4XxiGwbM5TZLkj5V265ler9dyHeedYj5/MnvzQMrT7W73lc1W1ohG3xLiCCISrbVabbePK6WWtj7YMYjyudwLlhBTg4MIACBOkisr7dazvV5vGQAgjKKLpmnexyi7dwA+1+p2TgzOkSiOftMaVi0hnm51O68GUs5lmVkZZdf7ZKIxnu4f36cnGuNpY3Tsr2GjGBH5aK02v398X1ob8ZuIKIZtCADAOb/rZuBB3fJjZBiG5bnuu4iY2w3gptrlc3zb+g/DZ3c9xGiesQAAAABJRU5ErkJggg=='
        />
    ));

    str = rr(str, "[[free-action]]", (match, i) => (
        <img
            key={match + count++}
            className='card-pfaction'
            style={{ height: textSize + 'pt' }}
            src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAl9JREFUOI19krFPFFEQxmfmvWXfvsMDBXZvF5Nb2D1yREFKrGhM6G1sBRMTG7CwAhErbFDDHyF2oDZGchTY0plYcdYIJrdcbo89jtt7FrdnFoJM8ZI3+b7ffJkMQKcQLhYiIrcta+NOcfwLY0xP+pTWdP+XzYCIzLas917ebXt5V40Xi9spSNfDIHkwBSFE5DnTeiuFsXjWOv8YRY0SR5qzLGuyEgRbSqk40as0DZPJ3LFyG17ebd92hjcRkQMADQ0Mrnt5tz3mFy4n6cRIzNSZLBYBAJvn57u1MPwKACpqRCXGeKaH83nTtCaCk2A7SdIBICLLmdY7KcSCUqoFANSjadPCENl6vV5SSrVPo9NdznmGE81ZlnWvEnQgLDGvSyGex0od/v5zPMsZG9Y0bUzjfFoX4kYYhjsAoBJIbwK5WwmCT8yx7Q2piwXGGBweHz2Iomj/NIo+92YyDxnRkMb5tDCEDMOwlEBKwhCjpOCRbTuThIABIkIcx9if7VtCRL0/2/eMc+Yn64kbjbMf3V1JQ05IXcwSUfus2dxHACAnZ69IIV4rpaAVxz8ZURERGQA0K9XqfHASfEjMU7Zp7hDRIDB6eVAurzEAoFoY7hmGBI3zGUI0EZEAoFWpVh8HJ8FmyvwtMb86KJfX0ncAAABOzl713RHluyNq4NbAk1TsKS/vHhVGvXbB85cu38E/QC0MvwvDUBrnM6AUhfX6lpRyMhV75eBX+c2Vh5SC7AlDohTiqZTy/s1s3wsiGkTGLsT+L6ADqe0Jw1CGrs8houwu7CrttTVsO6sF31++TvMXOj7bsM8roOMAAAAASUVORK5CYII='
        />
    ));

    str = rr(str, "[[reaction]]", (match, i) => (
        <img
            key={match + count++}
            className='card-pfaction'
            style={{ height: textSize + 'pt' }}
            src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAQCAYAAAD0xERiAAAABHNCSVQICAgIfAhkiAAAAkRJREFUOI2dlM9rE0EUx9+bnf2ZTYLJZtMmVUS0x1ykxaP05kl61LsHpSgieKoHQfBkq/4HCgXxIMUiCIJQRAWhIOJBQdAiVRSzu2l2s5ndnRkvpiwxCdZ3+877vs+892AGYSgIIWbRLp7UNXVB1/QWEjJFKbVSxnxUlJ04jrd6/fhZFEVvAEDmazEHKTjV6kXbtC4gYjOfGxGcC/HO7wQ3drvddSml2IMZhnGsXnMfUEU5xJLkdZql7xOWdBCRGKYxo1I6pyBpIaI+DGVJ8vD7zx/nOOcRqqramGk07/uBf68bho8459GoVnRdP3KgXF6yrcKSlFLN55I03fj6bWcRHcc56/v+Y855OGYkzO+mUCicmHbrT6QQlZxHBt3ueUREKqXMJuznrygViwu1SvUpAOx1KKR8qwCA2A8IAIAlyWfbtucVQmYHZ5RSl+wXNIgw7G7mtUTs/zeMUrWY13Gv9/yfYJZlHW82GqsDjYhqwTJP5yws2O3cnAijCi1PufVb0zX3RZamyYBVqzrXFKK0/ugsjHvLYRS9ouNA5VJp0alU74CUBwEA+oxtEkL0muNct03rKgAgILa9wL/kB8EawIgnYxjGrFt1bquUnsqNxWLGVgxNOwMAhwFxO4yiNc/3VtIsa+/5cgVKveZesUxzGQGKQ3eABNjwAn89zbKtOI4/CCHYsEfJiyRNv2SCv+Q8+4SIjFJaBgANAIgQgvzyvMuMsW0pJR+1mkk/AyCiZhjGUcs05zVVnUvS7GPba98d5/8Nkc/n9eZdAXIAAAAASUVORK5CYII='
        />
    ));

    return str;
};
