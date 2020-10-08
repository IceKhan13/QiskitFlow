import setuptools

with open("README.md", "r") as fh:
    long_description = fh.read()

with open("version", "r") as f:
    version = f.read()

setuptools.setup(
    name="qiskitflow",
    version=version,
    author="Iskandar Sitdikov",
    author_email="",
    description="QiskitFlow. Reproducible quantum experiments.",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/IceKhan13/QiskitFlow",
    packages=setuptools.find_packages(),
    keywords=['experiments', 'reproducibility', 'quantum computing', 'qiskit'],
    classifiers=[
        'License :: OSI Approved :: BSD License',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.7',
    ],
    install_requires=[
        'Click>=6'
    ],
    python_requires='>=3.7',
    entry_points='''
        [console_scripts]
        qiskitflow=qiskitflow.cli.cli:qiskitflow
    '''
)
