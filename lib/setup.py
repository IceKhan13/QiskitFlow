import setuptools

with open("README.md", "r") as fh:
    long_description = fh.read()

with open("qiskitflow/_version.py") as f:
    version = f.readlines()[-1].split()[-1].strip("\"'")

setuptools.setup(
    name="qiskitflow",
    version=version,
    author="Iskandar Sitdikov",
    author_email="iskandar.sitdikov@gmail.com",
    description="QiskitFlow. Reproducible quantum experiments.",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/IceKhan13/QiskitFlow",
    packages=setuptools.find_packages(),
    keywords=['quantum computing', 'qiskit', 'experiments', 'reproducibility'],
    classifiers=[
        'License :: OSI Approved :: BSD License',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.7',
    ],
    install_requires=[
        'Click>=6',
        'requests>=2.22.0'
    ],
    python_requires='>=3.7',
    entry_points='''
        [console_scripts]
        qiskitflow=qiskitflow.cli.cli:qiskitflow
    '''
)
